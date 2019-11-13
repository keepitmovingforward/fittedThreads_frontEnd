

function sortSizes(props) {
  let {clothing} = props
  let value
  let sizeNames = clothing.sizes.map(s => s.size)
  let prepForSort = sizeNames.map(name => {
    let shrunk = name.toLowerCase()
    if (shrunk === 'x-small' || shrunk === 'xs' || shrunk === 'x-s') {
        value = 1000;
    }
    else if (shrunk === 'small' || shrunk === 's' || shrunk ==='sm') {
        value = 1001;
    }
    else if (shrunk === 'medium' || shrunk === 'm' || shrunk ==='med') {
        value = 1002;
    }
    else if (shrunk === 'large' || shrunk === 'l' || shrunk ==='lg') {
        value = 1003;
    }
    else if (shrunk === 'x-large' || shrunk === 'xl' || shrunk === 'x-l') {
        value = 1004;
    }
    else if (shrunk === 'xx-large' || shrunk === 'xxl' || shrunk === 'xx-l') {
        value = 1005;
    }
    else if (shrunk === (parseInt(name.toLowerCase()).toString())) {
        value = 1 + parseInt(name.toLowerCase());
    }
    else {
        value = 9999;
    }
    return [value, name]
  })
    prepForSort.sort((function(a, b)
    {
        if(a[0] === b[0])
        {
            var x = a[1].toLowerCase(), y = b[1].toLowerCase();

            return x < y ? -1 : x > y ? 1 : 0;
        }
        return a[0] - b[0];
    }))

    return prepForSort.map(e => e[1])
}


export {sortSizes}
