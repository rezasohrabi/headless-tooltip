// Plugin to preserve 'use client' directive
export const preserveUseClient = () => ({
  name: 'preserve-use-client',
  generateBundle(options, bundle) {
    Object.keys(bundle).forEach((fileName) => {
      const chunk = bundle[fileName];
      if (chunk.type === 'chunk' && chunk.code) {
        chunk.code = "'use client';\n" + chunk.code;
      }
    });
  },
});
