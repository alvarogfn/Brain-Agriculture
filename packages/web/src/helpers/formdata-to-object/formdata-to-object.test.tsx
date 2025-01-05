import { formDataToObject } from './formdata-to-object';

describe('[Helpers]: formData-to-object', () => {
  it('should transform FormData field to array', () => {
    const formData = new FormData();
    formData.append('list', 'one');
    formData.append('list', 'two');

    const object = formDataToObject(formData);

    expect(object).toEqual({
      list: ['one', 'two'],
    });
  });

  it('should return transform FormData to object', () => {
    const formData = new FormData();
    formData.append('name', 'John Doe');
    formData.append('email', 'john@doe');
    formData.append('phone', '12345678910');

    const object = formDataToObject(formData);

    expect(object).toEqual({
      email: 'john@doe',
      name: 'John Doe',
      phone: '12345678910',
    });
  });
});
