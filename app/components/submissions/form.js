import { warn } from '@ember/debug';
import { inject as service } from '@ember/service';
import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { ForkingStore } from '@lblod/ember-submission-form-fields';
import { Namespace, NamedNode } from 'rdflib';
import { task } from 'ember-concurrency';

const RDF = new Namespace('http://www.w3.org/1999/02/22-rdf-syntax-ns#');
const FORM = new Namespace('http://lblod.data.gift/vocabularies/forms/');

export default class SubmissionsFormComponent extends Component {
  @service store;
  @service router;

  @tracked form;
  @tracked formStore;
  @tracked graphs;
  @tracked sourceNode;

  constructor() {
    super(...arguments);
    this.loadData.perform();
  }

  @task
  *loadData() {
    const submission = yield this.args.submission;
    // Fetch data from backend
    const submissionDocument = yield submission.submissionDocument;

    if (!submissionDocument) {
      warn('No submission document. Transitioning to index.');
      this.router.transitionTo('supervision.submissions');
    }

    const response = yield fetch(`/submission-forms/${submissionDocument.id}`);
    const { source, additions, removals, meta, form } = yield response.json();

    // Prepare data in forking store

    const formStore = new ForkingStore();

    const metaGraph = new NamedNode('http://data.lblod.info/metagraph');
    formStore.parse(meta, metaGraph, 'text/turtle');
    const formGraph = new NamedNode('http://data.lblod.info/form');
    formStore.parse(form, formGraph, 'text/turtle');

    const sourceGraph = new NamedNode(
      `http://data.lblod.info/submission-document/data/${submissionDocument.id}`
    );
    if (removals || additions) {
      formStore.loadDataWithAddAndDelGraph(
        source,
        sourceGraph,
        additions,
        removals,
        'text/turtle'
      );
    } else {
      formStore.parse(source, sourceGraph, 'text/turtle');
    }

    this.formStore = formStore;
    this.graphs = { formGraph, sourceGraph, metaGraph };
    this.form = formStore.any(undefined, RDF('type'), FORM('Form'), formGraph);
    this.sourceNode = new NamedNode(submissionDocument.uri);
  }
}
