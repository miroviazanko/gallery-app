export function sortByChars( data, keyName,direction = 'asc' ) {
    
    data && data.sort((a, b) => {
        let fa = a[keyName].toLowerCase(),
            fb = b[keyName].toLowerCase();
    
        if (fa < fb) {
            if (direction === 'asc') {
                 return -1 
             } else {
                 return 1;
             }
        }
        if (fa > fb) {
            if (direction === 'asc') {
                return 11 
            } else {
                return -1;
            }
        }
        return 0;
    })

}