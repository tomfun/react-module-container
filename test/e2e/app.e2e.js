'use strict';

describe('React application', () => {
  describe('open page', () => {
    it('should display hello', () => {
      browser.get('/');
      expect($('#hello').getText()).toBe('hello');
    });

    ['ng', 'ui'].forEach((router, index) => {
      it(`should display ${router} router app`, () => {
        browser.get(`/${router}-router-app/`);
        expect($('#value-in-angular').getText()).toBe('react-input-value');
        expect($(`${router}-view`).getText()).toBe('BAZINGA!');
        expect($('#value-in-react').getText()).toBe('angular-input-value');
        expect($('#counter').getText()).toBe('0');
      });

      it('should update inputs in nested apps', () => {
        browser.get(`/${router}-router-app/`);
        $('#counter').click();
        $('#angular-input').sendKeys('123');
        $('#react-input').sendKeys('123');
        expect($('#value-in-angular').getText()).toBe('react-input-value123');
        expect($('#value-in-react').getText()).toBe('angular-input-value123');
        expect($('#counter').getText()).toBe('1');
      });

      it('should support internal navigations', () => {
        browser.get(`/${router}-router-app/`);
        $('#counter').click();
        $('#angular-input').sendKeys('123');
        $('#react-input').sendKeys('123');
        $('#stagadish').click();
        expect($('#value-in-angular').getText()).toBe('react-input-value123');
        expect($('#value-in-react').getText()).toBe('angular-input-value123');
        expect($('#counter').getText()).toBe('1');
        expect($(`${router}-view`).getText()).toBe('STAGADISH!');
      });

      it('should be able to navigate from within nested app', () => {
        browser.get(`/${router}-router-app/`);
        expect($$('.nav').get(index).getCssValue('background-color')).toBe('rgba(255, 255, 0, 1)');
        $('router-link').click();
        expect($$('.nav').get(2).getCssValue('background-color')).toBe('rgba(255, 255, 0, 1)');
        $$('.react-link').get(index).click();
        expect($$('.nav').get(index).getCssValue('background-color')).toBe('rgba(255, 255, 0, 1)');
      });
    });
  });
});
