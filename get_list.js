var script = document.createElement('script');
script.src = 'https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js';
document.head.appendChild(script);
script.onload = function () {
    // jQuery가 로드된 후 실행할 코드
    console.log('jQuery가 로드되었습니다!');
};


function downloadTextFile(filename, data) {

    var blob = new Blob([data], { type: 'text/json' }),
        e = document.createEvent('MouseEvents'),
        a = document.createElement('a')

    a.download = filename
    a.href = window.URL.createObjectURL(blob)
    a.dataset.downloadurl = ['text/json', a.download, a.href].join(':')
    e.initMouseEvent('click', true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null)
    a.dispatchEvent(e)
}

function doSinglePage(url) {
    setTimeout(function () {
        console.log('gets printed only once after 1 seconds')
        fetch(url).then(r => r.text()).then(result => {
            var parser = new DOMParser();

            var DomObject = parser.parseFromString(result, "text/html");

            bookname = DomObject.querySelector("title").textContent + '.txt';
            content = DomObject.querySelector('#novel_content');
            content_line = content.querySelectorAll('p');
            let fullContent = '';

            content_line.forEach(pElement => {
                fullContent += pElement.textContent + '\n\n';
            });
            // TODO content parse
            downloadTextFile(bookname, fullContent);
        })
    }, 1000);
}


pages = $('.list-body .item-subject');

// Returns a Promise that resolves after "ms" Milliseconds
const timer = ms => new Promise(res => setTimeout(res, ms))

async function save() { // We need to wrap the loop into an async function for this to work
    for (var i = 0; i < pages.length; i++) {
        console.log(i);
        const href = pages[i].attr('href'); // Get href attribute of the current page
        // doSinglePage(href);

        await timer(3000); // then the created Promise can be awaited
    }
}

save();
