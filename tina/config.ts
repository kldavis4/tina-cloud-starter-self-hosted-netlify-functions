import {
  UsernamePasswordAuthJSProvider,
  TinaUserCollection,
} from "tinacms-authjs/dist/tinacms";
import { defineConfig, LocalAuthProvider } from "tinacms";

const isLocal = process.env.TINA_PUBLIC_IS_LOCAL === "true";

export default defineConfig({
  contentApiUrlOverride: "/api/tina/gql",
  authProvider: isLocal
    ? new LocalAuthProvider()
    : new UsernamePasswordAuthJSProvider(),
  build: {
    outputFolder: "admin",
    publicFolder: "public",
  },
  media: {
    tina: {
      mediaRoot: "",
      publicFolder: "public",
      static: true,
    },
  },
  schema: {
    collections: [
      TinaUserCollection,
      {
        name: "post",
        label: "Posts",
        path: "content/posts",
        fields: [
          {
            type: "string",
            name: "title",
            label: "Title",
            isTitle: true,
            required: true,
          },
          {
            type: "rich-text",
            name: "body",
            label: "Body",
            isBody: true,
          },
        ],
      },
      {
        name: "page",
        label: "Page",
        path: "content/pages",
        format: "md",
        ui: {
          router: () => "/",
        },
        fields: [
          {
            type: "string",
            name: "header",
            label: "Header",
          },
          {
            type: "object",
            name: "logo",
            label: "Logo",
            fields: [
              { type: "image", name: "url", label: "URL" },
              { type: "string", name: "alt", label: "Alt Text" },
            ],
          },
          {
            type: "object",
            list: true,
            name: "links",
            label: "Links",
            ui: {
              itemProps: (item) => {
                return {
                  label: item?.header,
                };
              },
            },
            fields: [
              { type: "string", name: "header" },
              { type: "string", name: "description" },
              { type: "string", name: "url" },
            ],
          },
        ],
      },
    ],
  },
});
