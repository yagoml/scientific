import { Details } from './index'

describe('shold unit test returnable functions of component details', () => {
  const props: any = {}
  const details = new Details(props)

  it('should return date from article', () => {
    details.state = {
      loading: false,
      article: {
        datePublished: '2009-04-01T07:00:00Z',
        id: '',
        title: '',
        authors: [],
        types: [],
        downloadUrl: ''
      }
    }

    const test = details.getDate()
    expect(test).toBe('2009-4-1')
  })
})
