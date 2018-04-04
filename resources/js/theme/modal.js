(function (window, document) {

    let toggles = Array.from(
        document.querySelectorAll('[data-toggle="modal"]')
    );

    let loading = '<div class="modal-loading"><div class="active loader large"></div></div>';

    toggles.forEach(function (toggle) {

        toggle.addEventListener('click', function (event) {

            event.preventDefault();

            /**
             * Open a modal with the loading content.
             */
            let modal = new tingle.modal({
                closeMethods: ['overlay', 'button', 'escape'],
                closeLabel: "Close",
                onOpen: function () {
                    console.log('modal open');
                },
                onClose: function () {
                    console.log('modal closed');
                },
            });

            /**
             * Open the modal and set loading.
             */
            modal.open();

            modal.setContent(loading);

            /**
             * Send the HTTP request out.
             */
            fetch(event.target.href, {credentials: 'same-origin'})
                .then(function (response) {
                    return response.text();
                }).then(function (data) {

                /**
                 * Create a fragment to work with.
                 * @type {Document}
                 */
                let dom = new DOMParser().parseFromString(data, 'text/html'),
                    fragment = document.createDocumentFragment(),
                    childNodes = dom.body.childNodes;

                while (childNodes.length) fragment.appendChild(childNodes[0]);

                /**
                 * Append scripts to fragment
                 * so they are executed.
                 * @type {NodeList}
                 */
                let scripts = fragment.querySelectorAll('script'),
                    script, fixed, i, length;

                for (i = 0, length = scripts.length; i < length; i++) {

                    script = scripts[i];

                    fixed = document.createElement('script');
                    fixed.type = script.type;

                    // Put the script or src
                    if (script.innerHTML) {
                        fixed.innerHTML = script.innerHTML;
                    } else {
                        fixed.src = script.src;
                    }

                    fixed.async = false;

                    script.parentNode.replaceChild(fixed, script);
                }

                modal.setContent('');
                modal.modalBoxContent.appendChild(fragment);

            }).catch(function (error) {
                alert(error);
            });
        });
    });

    // // Handle ajax links in modals.
    // modal.on('click', 'a.ajax, .pagination a', function (e) {
    //
    //     e.preventDefault();
    //
    //     var wrapper = $(this).closest('.modal-content');
    //
    //     wrapper.append(loading);
    //
    //     $.get($(this).attr('href'), function (html) {
    //         wrapper.html(html);
    //     });
    // });
    //
    // // Handle ajax forms in modals.
    // modal.on('submit', 'form.ajax', function (e) {
    //
    //     e.preventDefault();
    //
    //     var wrapper = $(this).closest('.modal-content');
    //
    //     wrapper.append(loading);
    //
    //     if ($(this).attr('method') == 'GET') {
    //         $.get($(this).attr('action'), $(this).serializeArray(), function (html) {
    //             wrapper.html(html);
    //         });
    //     } else {
    //         $.post($(this).attr('action'), $(this).serializeArray(), function (html) {
    //             wrapper.html(html);
    //         });
    //     }
    // });

})(window, document);
