<template>
  <div class="app-contain">
    <h1>this is a template project</h1>
    <span>use: vue2.x + webpack5.x + babel7.x </span>
    <!-- <el-button @click="visible = true">Button</el-button> -->
    <!-- <ckeditor v-model="editorData" :editor="editor" :config="editorConfig"></ckeditor> -->
    <div id="editor"><p>this is a Editor</p></div>
    <router-view></router-view>
  </div>
</template>

<script>
// import CKEditor from "@ckeditor/ckeditor5-vue2";
// import ClassicEditor from "@ckeditor/ckeditor5-editor-classic/src/classiceditor";
// import HtmlEmbed from "@ckeditor/ckeditor5-html-embed/src/htmlembed";

//ok
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

// import ClassicEditor from "@ckeditor/ckeditor5-editor-classic/src/classiceditor";
// import Essentials from "@ckeditor/ckeditor5-essentials/src/essentials";
// import Paragraph from "@ckeditor/ckeditor5-paragraph/src/paragraph";
// import Bold from "@ckeditor/ckeditor5-basic-styles/src/bold";
// import Italic from "@ckeditor/ckeditor5-basic-styles/src/italic";

export default {
  name: "App",
  data() {
    return {};
  },
  mounted() {
    ClassicEditor.create(document.querySelector("#editor"), {
      /*    plugins: [HtmlEmbed],
      toolbar: ["htmlEmbed"],
      htmlEmbed: {
        showPreviews: true,
        sanitizeHtml: (inputHtml) => {
          const outputHtml = sanitize(inputHtml);
          return {
            html: outputHtml,
            hasChanged: true,
          };
        },
      }, */
    })
      .then((editor) => {
        window.editor = editor;
      })
      .catch((error) => {
        console.error("There was a problem initializing the editor.", error);
      });

    // ClassicEditor.create(document.querySelector("#editor"), {
    //   plugins: [Essentials, Paragraph, Bold, Italic, HtmlEmbed],
    //   toolbar: ["bold", "italic"],
    // })
    //   .then((editor) => {
    //     console.log("Editor was initialized", editor);
    //   })
    //   .catch((error) => {
    //     console.error(error.stack);
    //   });
  },
};
</script>

<style lang="scss" scoped>
.app-contain {
  color: green;
}
</style>
