import { WickwockPage } from './app.po';

describe('wickwock App', function() {
  let page: WickwockPage;

  beforeEach(() => {
    page = new WickwockPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
