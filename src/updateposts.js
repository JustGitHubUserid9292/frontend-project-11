import fetchData from "./fetchData"
import parse from "./parse"
import showContent from "./showContent"

export default function updatePosts(url, state) {  
  const errorsContainer = document.querySelector('.feedback');
  const input = document.querySelector('#url-input')
  fetchData(url).then(({ data }) => {
    if (!parse(data.contents)) {  
      input.classList.add('is-invalid');  
      if (!errorsContainer.classList.contains('text-danger')) {  
        errorsContainer.classList.add('text-danger');  
      }  
      errorsContainer.textContent = 'Ресурс не содержит валидный RSS';
    } else {
      state.content = parse(data.contents)
      console.log(state)
      showContent(state.content);
      errorsContainer.classList.remove('text-danger');  
      errorsContainer.classList.add('text-success');  
      errorsContainer.textContent = 'RSS успешно загружен';
    }
  }).catch(err => {
    if (err) {  
      if (!errorsContainer.classList.contains('text-danger')) {  
        errorsContainer.classList.add('text-danger');  
      }  
      errorsContainer.textContent = 'Ошибка сети';  
    }  
  }); 
  setTimeout(() => updatePosts(url), 5000);  
}
