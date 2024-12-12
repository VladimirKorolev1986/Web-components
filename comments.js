class CommentsComponent extends HTMLElement {
    constructor() {
        super();
        
     
        this.attachShadow({ mode: 'open' });

        const template = document.getElementById('comment-template');
        const instance = template.content.cloneNode(true);
        this.shadowRoot.appendChild(instance);
        this.authorSlot = this.shadowRoot.querySelector('slot[name="author"]');
        this.dateSlot = this.shadowRoot.querySelector('slot[name="date"]');
        this.contentSlot = this.shadowRoot.querySelector('slot[name="content"]');
        this.repliesSlot = this.shadowRoot.querySelector('.nested-comments slot[name="replies"]');

        let likeButton = this.shadowRoot.querySelector(".like-button");
        let replyButton = this.shadowRoot.querySelector(".reply-button");

        likeButton.addEventListener("click", () => this.like());
        replyButton.addEventListener("click", () => this.reply());
    }

    connectedCallback() {
        console.log("Компонент подключён!");
    }

    disconnectedCallback() {
        console.log("Компонент отключён!");
    }

    attributeChangedCallback(name, oldValue, newValue) {
        if (name === 'author') {
            this.authorSlot.textContent = newValue;
        }
        if (name === 'date') {
            this.dateSlot.textContent = new Date(newValue).toLocaleDateString();
        }
        if (name === 'content') {
            this.contentSlot.textContent = newValue;
        }
    }

    static get observedAttributes() {
        return ['author', 'date', 'content'];
    }

    like() {
        alert(`Понравилось ${this.getAttribute('author')}!`);
    }

    reply() {
        const nestedComment = document.createElement('my-comment');
        nestedComment.setAttribute('content', prompt("Ваш ответ:"));
        this.appendChild(nestedComment);
    }
}

customElements.define('my-comment', CommentsComponent);

function addComment() {
    const commentContainer = document.getElementById("comments-container");
    const newComment = document.createElement("my-comment");
    newComment.setAttribute("author", "Пользователь");
    newComment.setAttribute("date", new Date().toISOString());
    newComment.setAttribute("content", prompt("Напишите комментарий:"));
    commentContainer.appendChild(newComment);
}
