export function checkImage( imgUrl, setState ) {
    
    function testImage(URL) {
        var tester=new Image();
        //tester.onload=imageFound;
        tester.onerror=imageNotFound;
        tester.src=URL;
    }

    function imageNotFound() {
        setState('');
    }

    const imageExists = testImage(imgUrl);

    return  imageExists;
}