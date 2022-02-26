import { MdRestartAlt } from "react-icons/md";

export function fetchData(path, method, setStateFn, ...rest) {
    fetch( path, {
        "method": method,
        MdRestartAlt
    }).then( response => response.json() )
    .then( data => setStateFn(data) )
}