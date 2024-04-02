import _ from 'lodash';
import * as yup from 'yup';
import { parseString } from 'xml2js';
import axios from 'axios';


const isRSSLink = async (value) => { 
  try { 
    const response = await axios.get(value); 
    const xmlData = response.data; 
    const parsedData = await new Promise((resolve, reject) => { 
      parseString(xmlData, (err, result) => { 
        if (err) reject(err); 
        else resolve(result); 
      }); 
    }); 
    if (parsedData && parsedData.rss) { 
      return true; 
    } else { 
      return false; 
    } 
  } catch (error) { 
    return false; 
  } 
}; 
 
yup.addMethod(yup.string, 'isRSSLink', function(message) { 
  return this.test({ 
    name: 'is-rss-link', 
    message: message || '${path} must be a valid RSS link', 
    test: isRSSLink 
  }); 
}); 
 
const schema = yup.object().shape({  
  url: yup.string().url('Ссылка должна быть валидным URL').test('not-duplicate', 'RSS уже существует', function (value) {  
      const list = this.parent.list || [];  
      return !list.includes(value);  
    }) //.test('is-rss-link', 'Ресурс не содержит валидный RSS', isRSSLink)
}); 
 
export default async function validate(state) { 
  try { 
    await schema.validate(state, { abortEarly: false }); 
    return {}; 
  } catch (e) { 
    return _.keyBy(e.inner, 'path'); 
  } 
};