import React from "react";
import { Editor } from '@tinymce/tinymce-react';

export default class RichEditorQuill extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
      mediaType: 'image',
    };
  }

  render() {
    const {value, onChange} = this.props;
    return <div>
      <Editor
      licenseKey="gpl"
      apiKey='ngkuqq74ysgvlfrbip87z23lw29m9ejhytniaja6v16z7q77'
      value={value || ''}
      init={{
        plugins: 'anchor autolink charmap codesample emoticons image link lists media searchreplace table visualblocks wordcount checklist mediaembed casechange export formatpainter pageembed linkchecker a11ychecker tinymcespellchecker permanentpen powerpaste advtable advcode editimage advtemplate mentions tableofcontents footnotes mergetags autocorrect typography inlinecss markdown',
        toolbar: 'undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link image media table mergetags | addcomment showcomments | spellcheckdialog a11ycheck typography | align lineheight | checklist numlist bullist indent outdent | emoticons charmap | removeformat | code',
      }}
      onChange={onChange}
    />
  </div>
  }
}
