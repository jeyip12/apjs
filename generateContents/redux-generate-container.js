const generateContainer = data => {
  let filesToZip = {};
  let keys = Object.keys(data);
  let code = '';
  for (let i = 0; i < keys.length; i++) {
    if (keys[i] === 'Actions' || keys[i] === 'Containers' || keys[i] === 'Reducers' || keys[i] === 'Components') {
      continue;
    }
    let state = data[keys[i]][data[keys[i]].length - 1][0];
    if (state === 'container') {
      code += "import React, { Component } from 'react';\n";
      code += "import { connect } from 'react-redux';\n";
      code += "import { bindActionCreators } from redux;\n";
      code += "import * as actionCreators from './../actions/actionTypes';\n";
      if (data[keys[i]]) {
        for (let k=0; k < data[keys[i]].length; k++) {
          code += `import ${data[keys[i]][k]} from './${data[keys[i]][k]}';\n`;
        }
      }
      code += '\n';
      code += `class ${keys[i]} extends Component {\n`;
      code += '  render() {\n';
      code += '    return (\n';
      code += '      <div>\n';
      if (data[keys[i]]) {
        for (let j=0; j < data[keys[i]].length; j++) {
          code += `        <${data[keys[i]][j]} />\n`;
        }
      }
      code += '      </div>\n';
      code += '    );\n';
      code += '  };\n';
      code += '}\n\n';
      code += "function mapStateToProps(state = {}) {\n";
      code += '  return {prop: state.prop};\n';
      code += '}\n\n';
      code += 'function mapDispatchToProps(dispatch) {\n';
      code += '  return {actions: bindActionCreators(actionCreators, dispatch)};\n';
      code += '}\n\n';
      code += `export default connect(mapStateToProps, mapDispatchToProps)(${keys[i]});`;
      filesToZip[keys[i]] = code;
      code = '';
    }
  }
  return filesToZip;
}

export default generateContainer;