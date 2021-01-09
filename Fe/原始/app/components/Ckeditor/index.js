import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import MyUploadAdapter from './plugin';

function MyCustomUploadAdapterPlugin(editor) {
    const ed = editor;
    ed.plugins.get('FileRepository').createUploadAdapter = (loader) => new MyUploadAdapter(loader);
}

const Ckeditor = (props) => {
    const { data, name, onChange, onFocus, onBlur, onError, placeholder } = props;
    const editorRef = useRef(null);
    useEffect(() => {
        if (window[`ck-${name}`]) {
            if (!!data && window[`ck-${name}`].getData() !== data) {
                window[`ck-${name}`].setData(data);
            }
        } else {
            initializeEditor();
        }
    }, [data]);
    useEffect(() => {
        (() => {})();
        return () => {
            window[`ck-${name}`].destroy();
            delete window[`ck-${name}`];
        };
    }, []);

    const initializeEditor = () => {
        ClassicEditor.create(editorRef.current, {
            removePlugins: ['link', 'insertTable', 'mediaEmbed'],
            extraPlugins: [MyCustomUploadAdapterPlugin],
            toolbar: ['bold', 'italic', 'bulletedList', 'numberedList', 'imageUpload'],
            placeholder,
        })
            .then((editor) => {
                // https://github.com/ckeditor/ckeditor5-editor-classic/blob/55f353e2888941f5c309c84534e67f2c60a9bd95/src/classiceditor.js#L97
                // 这里很sb 它把方法重定义到超类上，如果引用根本找不到这个方法，这里曲线救国一下；
                // 0416 这里确定唯一性 && 解决赋值引起的编辑器多次创建
                if (!window[`ck-${name}`]) {
                    window[`ck-${name}`] = editor;
                    window[`ck-${name}`].setData(data || '<p />');
                }
                const modelDocument = editor.model.document;
                const viewDocument = editor.editing.view.document;
                modelDocument.on('change:data', () => {
                    if (onChange) {
                        onChange(editor);
                    }
                });

                viewDocument.on('focus', () => {
                    if (onFocus) {
                        onFocus(editor);
                    }
                });

                viewDocument.on('blur', () => {
                    if (onBlur) {
                        onBlur(editor);
                    }
                });
            })
            .catch((error) => {
                const onErrorCallback = onError || console.error;
                onErrorCallback(error);
            });
    };

    return <div ref={editorRef} dangerouslySetInnerHTML={{ __html: data || '<p />' }} />;
};

Ckeditor.propTypes = {
    data: PropTypes.string,
    name: PropTypes.string.isRequired,
    onChange: PropTypes.func,
    onFocus: PropTypes.func,
    onBlur: PropTypes.func,
    onError: PropTypes.func,
    placeholder: PropTypes.string,
};

export default Ckeditor;
