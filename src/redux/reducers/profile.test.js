import profileReducer, { addPost, setUserProfile, setStatus } from './pprofile-reducer';

const state = {
    posts: [
        { id: 1, postMessage: 'why always me?', likesCounter: 12 },
        { id: 2, postMessage: 'i am ok, right now', likesCounter: 124, }
    ],
    userProfile: null,
    status: '',
};

describe('testing array with posts in profile reducers', () => {

    const action = addPost('hihihi'),
        newState = profileReducer(state, action)

    it('posts length must be more at 1 than post length', () => {
        expect(newState.posts.length).toBe(state.posts.length + 1);
    });

    it('check post on correctness', () => {
        const newObjInState = { id: 3, postMessage: 'hihihi', likesCounter: 0 };
        expect(newState.posts).toContainEqual(newObjInState);

        //OR

        // const newObjInState = [{ id: 3, postMessage: 'hihihi', likesCounter: 0 }];
        // expect(newState.posts).toEqual(expect.arrayContaining(newObjInState))
    })
})

describe('test user profile', () => {

    const objWithUserData = { name: 'Apple Compot', age: 22, city: 'Kharkov' },
        action = setUserProfile(objWithUserData),
        newState = profileReducer(state, action);

    it('user profile is true', () => {
        expect(newState.userProfile).toEqual(expect.anything())
    });

    it('check user profile on correctness', () => {
        expect(newState.userProfile).toMatchObject(objWithUserData)
    })
})

describe('testing status', () => {
    
    const newStatus = 'how are you?',
        action = setStatus(newStatus),
        newState = profileReducer(state, action);

    it('status in new state must be match with new status', () => {
        expect(newState.status).toMatch(new RegExp(newState))
    })

})