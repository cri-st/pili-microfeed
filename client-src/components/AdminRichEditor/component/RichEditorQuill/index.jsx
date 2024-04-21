import React from "react";
import ReactQuill, {Quill} from "react-quill";
import BlotFormatter from "quill-blot-formatter";
import RichEditorMediaDialog from "../RichEditorMediaDialog";
import { Editor } from '@tinymce/tinymce-react';

Quill.register({
  'modules/blotFormatter': BlotFormatter,
});

const toolbarOptions = [
  [{'header': [2, 3, false]}],
  ['bold', 'italic', 'underline', 'blockquote', 'code-block'],
  [{'list': 'ordered'}, {'list': 'bullet'}, {'indent': '-1'}, {'indent': '+1'}],
  ['link', 'image', 'video'],
  ['clean']
];

const modules = {
  toolbar: {
    container: toolbarOptions,
    // handlers: {
    //   image: imageHandler,
    //   video: videoHandler,
    // },
  },
  blotFormatter: {
    // see config options below
  },
};

const formats = [
  'header',
  'bold', 'italic', 'underline', 'blockquote', 'code-block',
  'list', 'bullet', 'indent',
  'link',
  'image', 'video',
];

export default class RichEditorQuill extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
      mediaType: 'image',
      quillSelection: null,
    };
  }

  componentDidMount() {
    this.attachQuillRefs();
  }

  componentDidUpdate() {
    this.attachQuillRefs();
  }

  attachQuillRefs() {
    if (typeof this.reactQuillRef.getEditor !== 'function') return;
    this.quillRef = this.reactQuillRef.getEditor();
  }

  render() {
    const {value, onChange, extra} = this.props;
    const {isOpen, mediaType, quillSelection} = this.state;
    return <div>
      <Editor
      licenseKey="gpl"
      apiKey='ngkuqq74ysgvlfrbip87z23lw29m9ejhytniaja6v16z7q77'
      initialValue={value || ''}
      init={{
        plugins: 'anchor autolink charmap codesample emoticons image link lists media searchreplace table visualblocks wordcount checklist mediaembed casechange export formatpainter pageembed linkchecker a11ychecker tinymcespellchecker permanentpen powerpaste advtable advcode editimage advtemplate mentions tableofcontents footnotes mergetags autocorrect typography inlinecss markdown',
        toolbar: 'undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link image media table mergetags | addcomment showcomments | spellcheckdialog a11ycheck typography | align lineheight | checklist numlist bullist indent outdent | emoticons charmap | removeformat | code',
      }}
      onChange={onChange}
    />
    <ReactQuill
      theme="snow"
      value={value || ''}
      onChange={onChange}
      modules={modules}
      formats={formats}
      ref={(ref) => {
        if (ref) {
          this.reactQuillRef = ref;
          this.quillRef = ref.getEditor();
          const toolbar = this.quillRef.getModule('toolbar');
          toolbar.addHandler('image', () => {
            this.setState({isOpen: true, mediaType: 'image', quillSelection: this.quillRef.getSelection()});
          });
          toolbar.addHandler('video', () => {
            this.setState({isOpen: true, mediaType: 'video', quillSelection: this.quillRef.getSelection()});
          });
        }
      }}
    />
    <RichEditorMediaDialog
      isOpen={isOpen}
      setIsOpen={(isOpen) => this.setState({isOpen})}
      mediaType={mediaType}
      quill={this.quillRef}
      quillSelection={quillSelection}
      extra={extra}
    />
  </div>
  }
}
