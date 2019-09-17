import musicReducer, { setTracks, addTracks } from './music-reducer'

let myMock = jest.fn(() => ['track 1', 'track 2', 'track 3']);

describe('test music reducer', () => {

    test('tracks length must be 3', () => {
        let response = myMock(),
            action = setTracks(response),
            newState = musicReducer([], action),
            {tracks} = newState;
        expect(tracks).toHaveLength(3);
    })

    test('tracks length in newState must be graten than tracks length in oldState', () => {
        let response = myMock(),
            state = musicReducer([], setTracks(response)),
            newState = musicReducer(state, addTracks(response));
            expect(newState.tracks.length).toBeGreaterThan(state.tracks.length);
    })
})