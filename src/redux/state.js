let store = {
    state: {
        dialogs: [
            {
                id: 1,
                name: 'Denis'
            },
            {
                id: 2,
                name: 'Oleg'
            },
            {
                id: 3,
                name: 'Ura'
            },
            {
                id: 4,
                name: 'Alex'
            },
            {
                id: 5,
                name: 'Dima'
            },
            {
                id: 6,
                name: 'Valera'
            }
        ],
        messages: [
            {
                id: 1,
                message: 'Hiiii'
            },
            {
                id: 2,
                message: 'How are you?'
            },
            {
                id: 3,
                message: 'ooooooooooooooow'
            }
        ],
        posts: [
            {
                id: 1,
                postMessage: 'why always me?',
                likesCounter: 12
            },
            {
                id: 2,
                postMessage: 'i am ok, right now',
                likesCounter: 124,
            }
        ],
        inputValue: '',
        messageValue: '',
    },
    dispatch(action) {
        switch (action.type) {

            case 'ADD-POST':
                this.state.posts.push({
                    id: this.state.posts.length + 1,
                    postMessage: this.state.inputValue,
                    likesCounter: 0
                });
                this.state.inputValue = '';
                this.rerender(this);
                break;

            case 'ADD-MESSAGE': 
                this.state.messages.push( {
                    id: this.state.messages.length + 1,
                    message: this.state.messageValue
                } )
                this.state.messageValue = '';
                this.rerender(this);
                break;

            case 'CHANGE-VALUE':
                this.state.inputValue = action.text;
                this.rerender(this);
                break;
                
            case 'CHANGE-MESSAGE-VALUE': 
                this.state.messageValue = action.text;
                this.rerender(this);
                break;
        }
    },
    observer(someFunction) {
        this.rerender = someFunction;
    },
    rerender() { },
}

window.store = store;

export default store;