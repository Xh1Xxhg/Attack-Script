function getDomain(url) {
    const a = document.createElement('a');
    a.href = url;
    return a.hostname;
}

function filterElementsByDomain(elements, domain) {
    return Array.from(elements).filter(element => {
        if (element.tagName === 'A') {
            return getDomain(element.href) === domain;
        }
        return true;
    });
}

function triggerInteractiveElementsInNewWindow() {
    const clickableSelectors = [
        'a[href]',
        'button',
        '[onclick]',
        '[tabindex]',
    ];

    const clickableElements = document.querySelectorAll(clickableSelectors.join(','));

    const currentDomain = getDomain(window.location.href);
    const filteredClickableElements = filterElementsByDomain(clickableElements, currentDomain);

    filteredClickableElements.forEach((element, index) => {
        setTimeout(() => {
            const newWindow = window.open('', '_blank');

            if (newWindow && newWindow.document) {
                newWindow.document.write('<!DOCTYPE html><html><head><title>Triggered Element</title></head><body></body></html>');
                newWindow.document.close();

                const clonedElement = element.cloneNode(true);
                newWindow.document.body.appendChild(clonedElement);

                if (clonedElement.tagName === 'A') {
                    clonedElement.click();
                } else {
                    const event = new MouseEvent('click', {
                        bubbles: true,
                        cancelable: true,
                        view: newWindow,
                    });
                    clonedElement.dispatchEvent(event);
                }
            }
        }, index * 1000);
    });
}

function triggerAllElementsSimultaneously() {
    const clickableSelectors = [
        'a[href]',
        'button',
        '[onclick]',
        '[tabindex]',
    ];

    const clickableElements = document.querySelectorAll(clickableSelectors.join(','));

    const currentDomain = getDomain(window.location.href);
    const filteredClickableElements = filterElementsByDomain(clickableElements, currentDomain);

    filteredClickableElements.forEach(element => {
        if (element.tagName === 'A') {
            element.click();
        } else {
            const event = new MouseEvent('click', {
                bubbles: true,
                cancelable: true,
                view: window,
            });
            element.dispatchEvent(event);
        }
    });
}

triggerInteractiveElementsInNewWindow();
triggerAllElementsSimultaneously();