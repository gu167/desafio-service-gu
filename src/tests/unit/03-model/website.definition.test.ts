import { WebsiteObjectMother } from '../_model/website.object-mother';

describe('#WebsiteDefinition - Unit Tests', () => {
  test('Should create a valid instance of website when valid params are given', () => {
    const website = WebsiteObjectMother.validWebsite();

    expect(website).toEqual(website.clone());
  });

  test('Should throw an error when invalid params are given to website instance', () => {
    const error = new Error(
      'Website Errors: id must be a UUID; url should not be empty;',
    );
    expect(() => WebsiteObjectMother.invalidWebsite()).toThrow(error);
  });
});
