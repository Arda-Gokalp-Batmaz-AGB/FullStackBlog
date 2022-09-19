describe('Protractor Testing', function() {
    it('check redirection', function() 
    {
        browser.ignoreSynchronization = true;
        browser.get('http://localhost:4200/');
        expect(browser.getCurrentUrl()).toEqual('http://localhost:4200/entrysection');
    });
    it('to check the page title', function() 
    {
        browser.ignoreSynchronization = true;
        browser.get('http://localhost:4200/');
        browser.driver.getTitle().then(
        function(pageTitle) 
        {
            expect(pageTitle).toEqual('AngularBlogApp');
        });
    });
    it('to check the main header', function() 
    {
        browser.ignoreSynchronization = true;
        browser.get('http://localhost:4200/');
        element(by.css('h3')).getText().then((value) => {
            expect(value).toEqual("Blog Website");
        });
    });

});