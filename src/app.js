import validate from "./validate";
import _ from 'lodash';
import updatePosts from "./updatePosts";

const state = {
  list: [],
  url: '',
  content: '',
}

export default function app() {
  const form = document.querySelector('form')
  const input = document.querySelector('#url-input')
  form.addEventListener('submit', (e) => {
    e.preventDefault()
    const formData = new FormData(e.target)
    const errorsContainer = document.querySelector('.feedback')
    state.url = formData.get('url')
    validate(state).then(content => {
        if (!_.isEmpty(content)) {
            errorsContainer.textContent = content.url.message
            input.classList.add('is-invalid')
            if (!errorsContainer.classList.contains('text-danger')) {
              errorsContainer.classList.add('text-danger')
            }
        } else {
            state.list.push(formData.get('url'))
            errorsContainer.textContent = ''
            input.classList.remove('is-invalid')
            updatePosts(formData.get('url'), state)
        }
    })
    form.reset()
  })
}