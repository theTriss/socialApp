import { newsAPI } from '../../api/api';
import newsReducer, {setNews, addNews} from './news-reducers';

describe('test news reducer', () => {

  test('check response from news API', async () => {
    expect.assertions(3);
    let response = await newsAPI.getNews('', 'ua', 'sports');
    const {totalResults, articles, status} = response.data;
    expect(totalResults).toBe(70);
    expect(articles).toHaveLength(20);
    expect(status).toEqual(expect.stringContaining('ok'))
  })

  test('array with news in state must be 2, totalResults 10 and requestBody must be {}', () => {
    let action = setNews(['some text', 'some text'], 10, undefined);
    let newState = newsReducer([], action);
    let { news, totalResults, requestBody } = newState;
    expect(news).toHaveLength(2);
    expect(totalResults).toBe(10);
    expect(requestBody).not.toHaveProperty('q')
    expect(requestBody).not.toHaveProperty('country')
    expect(requestBody).not.toHaveProperty('category')
  })

  test('array with news length in newState must be graten than array with news in oldState', () => {
    let action = addNews(['some news']);
    let newState = newsReducer([], setNews(['some text', 'some text'], 10, undefined));
    newState = newsReducer(newState, action);
    let {news} = newState;
    expect(news).toHaveLength(3);
    expect(news).toEqual(expect.arrayContaining(['some news']))
  })

})