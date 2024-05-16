import _ from "lodash";

export default function showContent(content) {
  const posts = document.querySelector('.posts')
  const feeds = document.querySelector('.feeds')
  const elmlist = content[1].reduce((acc, { link, title }) => {
    const id = _.uniqueId()
    const elm = `<li class="list-group-item d-flex justify-content-between align-items-start border-0 border-end-0"><a href=${link} class="fw-bold" data-id=${id} target="_blank" rel="noopener noreferrer">${title}</a><button type="button" class="btn btn-outline-primary btn-sm" data-id=${id} data-bs-toggle="modal" data-bs-target="#modal">Просмотр</button></li>`
    acc.push(elm)
    return acc
  }, [])
  feeds.innerHTML = `<div class="card border-0"><div class="card-body"><h2 class="card-title h4">Фиды</h2></div><ul class="list-group border-0 rounded-0"><li class="list-group-item border-0 border-end-0"><h3 class="h6 m-0">${content[0].title}</h3><p class="m-0 small text-black-50">${content[0].description}</p></li></ul></div>`
  posts.innerHTML = `<div class="card border-0"><div class="card-body"><h2 class="card-title h4">Посты</h2></div><ul class="list-group border-0 rounded-0">${elmlist.join('')}`
}