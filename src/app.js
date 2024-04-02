import validate from "./validate";
import _ from 'lodash';

const state = {
  list: [],
  url: '',
}

export default function app() {
  const form = document.querySelector('form')
  const input = document.querySelector('#url-input')
  form.addEventListener('submit', (e) => {
    e.preventDefault()
    const formData = new FormData(e.target)
    const errorsContainer = document.querySelector('.feedback')
    console.log(errorsContainer)
    state.url = formData.get('url')
    validate(state).then(content => {
        console.log(content)
        if (!_.isEmpty(content)) {
            errorsContainer.textContent = content.url.message
            input.classList.add('is-invalid')
        } else {
            errorsContainer.textContent = ''
            input.classList.remove('is-invalid')
        }
    })
    form.reset()
  })
}