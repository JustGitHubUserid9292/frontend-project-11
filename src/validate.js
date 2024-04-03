import _ from 'lodash';
import * as yup from 'yup';

const schema = yup.object().shape({  
  url: yup.string().url('Ссылка должна быть валидным URL').test('not-duplicate', 'RSS уже существует', function (value) {  
      const list = this.parent.list || [];  
      return !list.includes(value);  
    })
}); 
 
export default async function validate(state) { 
  try { 
    await schema.validate(state, { abortEarly: false }); 
    return {}; 
  } catch (e) { 
    return _.keyBy(e.inner, 'path'); 
  } 
};