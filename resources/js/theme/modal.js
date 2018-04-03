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
             * @type {XMLHttpRequest}
             */
            let request = new XMLHttpRequest();

            request.open('GET', event.target.href, true);
            request.setRequestHeader('Content-Type', 'text/html');

            request.onreadystatechange = function () {
                if (request.readyState == 4) {
                    modal.setContent(request.response);
                }
            };

            request.send();
        });
    });

    // // Loading state
    // modal.on('loading', function() {
    //     $(this).find('.modal-content').append(loading);
    // });
    //
    // // Clear remote modals when closed.
    // modal.on('hidden.bs.modal', function () {
    //
    //     $(this).removeData('bs.modal');
    //
    //     $(this).find('.modal-content').html(loading);
    // });
    //
    // // Show loader for remote modals.
    // modal.on('show.bs.modal', function () {
    //     $(this).find('.modal-content').html(loading);
    // });
    //
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
