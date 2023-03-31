import { BaseTaskDefinition } from 'src/03-model/tasks-definition/base-task.definition';
import { MultipleChoiceQuestion } from 'src/03-model/tasks-definition/multiple-choice-task.definition';
import {
  SingleChoiceQuestion,
  OptionType,
} from 'src/03-model/tasks-definition/single-choice-task.definition';
import { TextQuestion } from 'src/03-model/tasks-definition/text-task.definition';
import { v4 as uuidv4 } from 'uuid';

export class TaskDataBuilder {
  id: string;
  question: any;
  typeId: number;

  constructor() {
    this.id = uuidv4();
    this.question = new TextQuestion('Quem é o idolo da Irlanda do Norte?');
    this.typeId = 1;
  }

  static aTextTask() {
    const textTask = new TaskDataBuilder();
    return textTask;
  }

  static aSingleChoiceTask() {
    const singleChoiceTask = new TaskDataBuilder();
    singleChoiceTask.typeId = 2;

    const singleChoiceStatement = 'Single Choice Statement';
    const singleChoiceOptions: OptionType = {
      text: 'Single Choice Text',
      checked: true,
    };

    const singleChoiceQuestion = new SingleChoiceQuestion(
      singleChoiceStatement,
      singleChoiceOptions,
    );

    singleChoiceTask.question = singleChoiceQuestion;

    return singleChoiceTask;
  }

  static aMultipleChoiceTask() {
    const multipleChoiceTask = new TaskDataBuilder();
    multipleChoiceTask.typeId = 3;

    const multipleChoiceStatement = 'Multiple Choice Statement';
    const multipleChoiceOptions: OptionType[] = [
      { text: 'Multiple Choice Text', checked: true },
      { text: 'Multiple Choice Text2', checked: false },
      { text: 'Multiple Choice Text3', checked: true },
      { text: 'Multiple Choice Text4', checked: false },
    ];

    const multipleChoiceQuestion = new MultipleChoiceQuestion(
      multipleChoiceStatement,
      multipleChoiceOptions,
    );

    multipleChoiceTask.question = multipleChoiceQuestion;

    return multipleChoiceTask;
  }

  withInvalidParams() {
    this.id = '';
    this.question = '';
    this.typeId = 0;
    return this;
  }

  build<T>() {
    return new BaseTaskDefinition<T>(this.id, this.question, this.typeId);
  }
}
