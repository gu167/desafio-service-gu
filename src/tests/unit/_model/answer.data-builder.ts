import { BaseAnswerDefinition } from 'src/03-model/answers-definition/base-answer.definition';
import { TaskTypesEnum } from 'src/03-model/tasks-definition/base-task.definition';
import { OptionType } from 'src/03-model/tasks-definition/single-choice-task.definition';
import { v4 as uuidv4 } from 'uuid';

export class AnswerDataBuilder {
  id: string;
  taskId: string;
  answerType: TaskTypesEnum;
  answerContent: any;

  constructor() {
    // o default é sempre o caso de sucesso
    this.id = uuidv4();
    this.taskId = uuidv4();
    this.answerType = 1;
    this.answerContent = { AnswerContent: 'Olha ele todo Nicolas Cagezinho' };
  }

  static aTextAnswer() {
    const textAnswer = new AnswerDataBuilder();
    const contentProperty = {
      AnswerContent: 'De lado parece o Antônio Fagundes',
    };
    textAnswer.answerContent = contentProperty;
    return textAnswer;
  }

  static aSingleChoiceAnswer() {
    const singleChoiceAnswer = new AnswerDataBuilder();
    singleChoiceAnswer.answerType = 2;
    const options: OptionType = {
      text: 'Single Choice Answer',
      checked: true,
    };
    singleChoiceAnswer.answerContent = options;

    return singleChoiceAnswer;
  }

  static aMultipleChoiceAnswer() {
    const multipleChoiceAnswer = new AnswerDataBuilder();
    multipleChoiceAnswer.answerType = 3;
    const contentProperty = [
      {
        text: 'Multiple Choice Answer1',
        checked: true,
      },
      {
        text: 'Multiple Choice Answer2',
        checked: false,
      },
      {
        text: 'Multiple Choice Answer3',
        checked: true,
      },
      {
        text: 'Multiple Choice Answer4',
        checked: false,
      },
    ];
    multipleChoiceAnswer.answerContent = { AnswerContent: contentProperty };
    return multipleChoiceAnswer;
  }
  withInvalidParams() {
    this.id = '';
    this.taskId = '';
    this.answerType = 0;
    this.answerContent = '';
    return this;
  }
  build() {
    return new BaseAnswerDefinition(
      this.id,
      this.taskId,
      this.answerType,
      this.answerContent,
    );
  }
}
