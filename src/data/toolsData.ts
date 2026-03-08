import {
  FileText, FileDown, GitMerge, Scissors, Minimize2, Image, Download,
  Lock, Unlock, Table, Monitor, Crop, Maximize2, ImageDown, ScanLine,
  RefreshCw, Layers, PenTool, RotateCw, Hash, Type, AlignLeft,
  Code, Code2, Globe, Shield, Key, Cpu, Calculator, Clock,
  QrCode, Link, Search, BarChart2, Shuffle, Zap, Terminal,
  FileCode, Braces, Camera, Eye, Palette, Filter, Frame,
  Binary, Fingerprint, Dice1, AtSign, User, Wifi, FileSearch,
  TrendingUp, MapPin, Timer, Percent, DollarSign, Activity,
  ArrowUpDown, List, AlignJustify, AlignCenter, BookOpen,
  Italic, Bold, Strikethrough, Tag, Regex, Rss,
} from "lucide-react";

export type ToolEntry = {
  icon: React.ElementType;
  label: string;
  slug: string;
  desc: string;
  inputLabel?: string;
  inputFormat?: string;
  seoTitle: string;
  seoDesc: string;
  steps: string[];
  category: string;
  isBrowserTool?: boolean; // true = runs client-side, no file upload needed
};

export type ToolCategory = {
  id: string;
  label: string;
  color: "blue" | "teal" | "indigo" | "purple" | "orange" | "green" | "rose";
  icon: React.ElementType;
  tools: ToolEntry[];
};

export const toolCategories: ToolCategory[] = [
  // ─── PDF Tools ──────────────────────────────────────────────────────────────
  {
    id: "pdf",
    label: "PDF Tools",
    color: "blue",
    icon: FileText,
    tools: [
      {
        icon: Image, label: "Image to PDF", slug: "image-to-pdf", category: "pdf",
        desc: "Convert images (JPG, PNG, WebP) into a polished PDF file seamlessly.",
        inputLabel: "Image", inputFormat: ".jpg,.jpeg,.png,.webp,.bmp",
        seoTitle: "Convert Image to PDF – Free Online Converter",
        seoDesc: "Convert JPG, PNG and other image files to PDF online with Viadocs.",
        steps: ["Upload your image file", "We layout it as PDF", "Download the PDF"],
      },
      {
        icon: FileText, label: "PDF to Word", slug: "pdf-to-word", category: "pdf",
        desc: "Convert your PDF documents into fully editable Word files — fonts and layout preserved.",
        inputLabel: "PDF", inputFormat: ".pdf",
        seoTitle: "Convert PDF to Word – Editable, Accurate & Free",
        seoDesc: "Convert PDF files into editable Word documents online with Viadocs.",
        steps: ["Upload your PDF file", "Processing layout", "Download your Word file"],
      },
      {
        icon: FileDown, label: "Word to PDF", slug: "word-to-pdf", category: "pdf",
        desc: "Export your Word documents into professional PDF files instantly.",
        inputLabel: "Word", inputFormat: ".docx,.doc",
        seoTitle: "Convert Word to PDF – Fast, Free & Accurate",
        seoDesc: "Instantly convert Word documents to PDF online with Viadocs.",
        steps: ["Upload your Word file", "Converting to PDF format", "Download your PDF"],
      },
      {
        icon: GitMerge, label: "Merge PDF", slug: "pdf-merge", category: "pdf",
        desc: "Combine multiple PDF files into one seamless document in seconds.",
        inputLabel: "PDF files", inputFormat: ".pdf",
        seoTitle: "Merge PDF Files – Combine PDFs Online Free",
        seoDesc: "Merge multiple PDFs into one file instantly with Viadocs.",
        steps: ["Upload your PDF files", "We merge them in order", "Download the merged PDF"],
      },
      {
        icon: Scissors, label: "Split PDF", slug: "pdf-split", category: "pdf",
        desc: "Extract specific pages or split your PDF into multiple files.",
        inputLabel: "PDF", inputFormat: ".pdf",
        seoTitle: "Split PDF – Extract Pages Online Free",
        seoDesc: "Split PDF files and extract specific pages online.",
        steps: ["Upload your PDF file", "Select pages to extract", "Download split files"],
      },
      {
        icon: Minimize2, label: "Compress PDF", slug: "pdf-compress", category: "pdf",
        desc: "Reduce the size of your PDF without losing quality.",
        inputLabel: "PDF", inputFormat: ".pdf",
        seoTitle: "Compress PDF – Reduce PDF Size Online Free",
        seoDesc: "Compress PDF files online to reduce file size while maintaining quality.",
        steps: ["Upload your PDF file", "Compressing intelligently", "Download smaller PDF"],
      },
      {
        icon: Download, label: "PDF to JPG", slug: "pdf-to-image", category: "pdf",
        desc: "Save every PDF page as a high-quality JPG or PNG image.",
        inputLabel: "PDF", inputFormat: ".pdf",
        seoTitle: "Convert PDF to JPG – Extract Pages as Images",
        seoDesc: "Convert PDF pages to JPG or PNG images online.",
        steps: ["Upload your PDF file", "Pages rendered as images", "Download image files"],
      },
      {
        icon: RotateCw, label: "Rotate PDF", slug: "rotate-pdf", category: "pdf",
        desc: "Rotate PDF pages to any angle — correct orientation instantly.",
        inputLabel: "PDF", inputFormat: ".pdf",
        seoTitle: "Rotate PDF Pages Online – Free PDF Rotator",
        seoDesc: "Rotate PDF pages online for free with Viadocs.",
        steps: ["Upload your PDF file", "Choose rotation angle", "Download rotated PDF"],
      },
      {
        icon: Lock, label: "Add Password to PDF", slug: "password-protect", category: "pdf",
        desc: "Add a password to secure and encrypt your PDF document.",
        inputLabel: "PDF", inputFormat: ".pdf",
        seoTitle: "Password Protect PDF – Secure Your Documents",
        seoDesc: "Add a password to your PDF files online.",
        steps: ["Upload your PDF file", "Set a secure password", "Download protected PDF"],
      },
      {
        icon: Unlock, label: "Unlock PDF", slug: "unlock-pdf", category: "pdf",
        desc: "Remove password restrictions from protected PDF files.",
        inputLabel: "PDF", inputFormat: ".pdf",
        seoTitle: "Unlock PDF – Remove PDF Password Online",
        seoDesc: "Remove password protection from PDF files online.",
        steps: ["Upload your locked PDF", "We remove restrictions", "Download unlocked PDF"],
      },
      {
        icon: Key, label: "Remove PDF Password", slug: "remove-pdf-password", category: "pdf",
        desc: "Strip encryption and remove the owner password from your PDF.",
        inputLabel: "PDF", inputFormat: ".pdf",
        seoTitle: "Remove PDF Password – Decrypt PDF Online Free",
        seoDesc: "Remove PDF owner password and decrypt PDF files online.",
        steps: ["Upload your PDF file", "Enter current password", "Download decrypted PDF"],
      },
      {
        icon: Hash, label: "PDF Page Number Adder", slug: "pdf-page-numbers", category: "pdf",
        desc: "Add page numbers to any PDF document in seconds.",
        inputLabel: "PDF", inputFormat: ".pdf",
        seoTitle: "Add Page Numbers to PDF – Free Online Tool",
        seoDesc: "Add page numbers to PDF documents online with Viadocs.",
        steps: ["Upload your PDF file", "Choose numbering style", "Download numbered PDF"],
      },
      {
        icon: PenTool, label: "PDF Watermark Adder", slug: "pdf-watermark", category: "pdf",
        desc: "Stamp a text or image watermark onto every page of your PDF.",
        inputLabel: "PDF", inputFormat: ".pdf",
        seoTitle: "Add Watermark to PDF – Free Online Watermark Tool",
        seoDesc: "Add text or image watermarks to PDF files online with Viadocs.",
        steps: ["Upload your PDF file", "Set watermark text/image", "Download watermarked PDF"],
      },
      {
        icon: Scissors, label: "Remove PDF Pages", slug: "remove-pdf-pages", category: "pdf",
        desc: "Delete unwanted pages from your PDF document with precision.",
        inputLabel: "PDF", inputFormat: ".pdf",
        seoTitle: "Remove Pages from PDF – Free Online PDF Editor",
        seoDesc: "Delete specific pages from PDF files online with Viadocs.",
        steps: ["Upload your PDF file", "Select pages to remove", "Download updated PDF"],
      },
      {
        icon: FileSearch, label: "Extract PDF Pages", slug: "extract-pdf-pages", category: "pdf",
        desc: "Extract a range of pages from your PDF as a new document.",
        inputLabel: "PDF", inputFormat: ".pdf",
        seoTitle: "Extract PDF Pages – Free Online PDF Page Extractor",
        seoDesc: "Extract specific pages from PDF files online.",
        steps: ["Upload your PDF file", "Choose page range", "Download extracted PDF"],
      },
      {
        icon: Table, label: "PDF to Excel", slug: "pdf-to-excel", category: "pdf",
        desc: "Convert PDF tables and data into editable Excel spreadsheets.",
        inputLabel: "PDF", inputFormat: ".pdf",
        seoTitle: "Convert PDF to Excel – Free Online PDF Converter",
        seoDesc: "Convert PDF tables to Excel spreadsheets online with Viadocs.",
        steps: ["Upload your PDF file", "Tables extracted to Excel", "Download XLSX file"],
      },
      {
        icon: Table, label: "Excel to PDF", slug: "excel-to-pdf", category: "pdf",
        desc: "Convert spreadsheets into professional PDF documents.",
        inputLabel: "Excel", inputFormat: ".xlsx,.xls",
        seoTitle: "Convert Excel to PDF – Free Online Converter",
        seoDesc: "Convert Excel spreadsheets to PDF online.",
        steps: ["Upload your Excel file", "We convert the sheet", "Download as PDF"],
      },
      {
        icon: Monitor, label: "PowerPoint to PDF", slug: "powerpoint-to-pdf", category: "pdf",
        desc: "Save your presentation slides into PDF format effortlessly.",
        inputLabel: "PowerPoint", inputFormat: ".pptx,.ppt",
        seoTitle: "Convert PowerPoint to PDF – Free Slides Converter",
        seoDesc: "Convert PowerPoint presentations to PDF online.",
        steps: ["Upload your PPT file", "Slides exported as PDF", "Download your PDF"],
      },
      {
        icon: Monitor, label: "PDF to PowerPoint", slug: "pdf-to-powerpoint", category: "pdf",
        desc: "Convert your PDF into fully editable PowerPoint presentation slides.",
        inputLabel: "PDF", inputFormat: ".pdf",
        seoTitle: "Convert PDF to PowerPoint – Free Online Converter",
        seoDesc: "Convert PDF files to editable PowerPoint presentations online.",
        steps: ["Upload your PDF file", "Slides are generated", "Download your PPTX"],
      },
      {
        icon: Camera, label: "Screenshot to PDF", slug: "screenshot-to-pdf", category: "pdf",
        desc: "Convert screenshots and images directly into a PDF document.",
        inputLabel: "Image", inputFormat: ".jpg,.jpeg,.png,.webp,.bmp",
        seoTitle: "Convert Screenshot to PDF – Free Online Tool",
        seoDesc: "Convert screenshots and images to PDF online with Viadocs.",
        steps: ["Upload your screenshot", "We convert to PDF", "Download PDF"],
      },
    ],
  },

  // ─── Image Tools ─────────────────────────────────────────────────────────────
  {
    id: "image",
    label: "Image Tools",
    color: "teal",
    icon: Image,
    tools: [
      {
        icon: Minimize2, label: "Image Compressor", slug: "compress-image", category: "image",
        desc: "Reduce image file size without visible quality loss.",
        inputLabel: "Image", inputFormat: ".jpg,.jpeg,.png,.webp",
        seoTitle: "Compress Image Online – Reduce Image Size Free",
        seoDesc: "Compress and reduce image file size online without losing quality.",
        steps: ["Upload your image", "We optimise compression", "Download smaller image"],
      },
      {
        icon: Crop, label: "Image Resizer", slug: "image-resize", category: "image",
        desc: "Resize images to any custom dimension while maintaining quality.",
        inputLabel: "Image", inputFormat: ".jpg,.jpeg,.png,.webp,.gif,.bmp",
        seoTitle: "Resize Image Online – Free Image Resizer",
        seoDesc: "Resize any image to custom dimensions online for free.",
        steps: ["Upload your image", "Set target dimensions", "Download resized image"],
      },
      {
        icon: Crop, label: "Image Cropper", slug: "image-crop", category: "image",
        desc: "Crop images to any size or aspect ratio with precision.",
        inputLabel: "Image", inputFormat: ".jpg,.jpeg,.png,.webp,.bmp",
        seoTitle: "Crop Image Online – Free Image Cropper Tool",
        seoDesc: "Crop images to any size or aspect ratio online for free.",
        steps: ["Upload your image", "Select crop area", "Download cropped image"],
      },
      {
        icon: RotateCw, label: "Image Rotator", slug: "image-rotate", category: "image",
        desc: "Rotate and flip images to any angle or orientation.",
        inputLabel: "Image", inputFormat: ".jpg,.jpeg,.png,.webp,.bmp,.gif",
        seoTitle: "Rotate Image Online – Free Image Rotation Tool",
        seoDesc: "Rotate images to any angle online for free.",
        steps: ["Upload your image", "Choose rotation angle", "Download rotated image"],
      },
      {
        icon: RefreshCw, label: "Background Remover", slug: "remove-background", category: "image",
        desc: "Automatically remove the background from any photo.",
        inputLabel: "Image", inputFormat: ".jpg,.jpeg,.png,.webp",
        seoTitle: "Remove Background from Image – Free Tool",
        seoDesc: "Remove image backgrounds automatically online with Viadocs.",
        steps: ["Upload your image", "Background is removed", "Download transparent PNG"],
      },
      {
        icon: ImageDown, label: "JPG to PNG", slug: "jpg-to-png", category: "image",
        desc: "Convert JPG images to lossless PNG format instantly.",
        inputLabel: "JPG Image", inputFormat: ".jpg,.jpeg",
        seoTitle: "Convert JPG to PNG – Free Online Converter",
        seoDesc: "Convert JPG images to PNG format online for free.",
        steps: ["Upload your JPG file", "We convert to PNG", "Download PNG file"],
      },
      {
        icon: ImageDown, label: "PNG to JPG", slug: "png-to-jpg", category: "image",
        desc: "Convert PNG images to compressed JPG format.",
        inputLabel: "PNG Image", inputFormat: ".png",
        seoTitle: "Convert PNG to JPG – Free Online Converter",
        seoDesc: "Convert PNG images to JPG format online for free.",
        steps: ["Upload your PNG file", "We convert to JPG", "Download JPG file"],
      },
      {
        icon: ImageDown, label: "WebP to JPG", slug: "webp-to-jpg", category: "image",
        desc: "Convert WebP images to universally compatible JPG format.",
        inputLabel: "WebP Image", inputFormat: ".webp",
        seoTitle: "Convert WebP to JPG – Free Online Converter",
        seoDesc: "Convert WebP images to JPG format online for free.",
        steps: ["Upload your WebP file", "We convert to JPG", "Download JPG file"],
      },
      {
        icon: ImageDown, label: "JPG to WebP", slug: "jpg-to-webp", category: "image",
        desc: "Convert JPG images to modern WebP format for smaller file sizes.",
        inputLabel: "JPG Image", inputFormat: ".jpg,.jpeg",
        seoTitle: "Convert JPG to WebP – Free Online Converter",
        seoDesc: "Convert JPG images to WebP format online for free.",
        steps: ["Upload your JPG file", "We convert to WebP", "Download WebP file"],
      },
      {
        icon: RefreshCw, label: "Image Format Converter", slug: "image-format-converter", category: "image",
        desc: "Convert any image between JPG, PNG, WebP, BMP, GIF, and more.",
        inputLabel: "Image", inputFormat: ".jpg,.jpeg,.png,.webp,.bmp,.gif,.tiff",
        seoTitle: "Image Format Converter – Convert Any Image Format Free",
        seoDesc: "Convert images between any format online for free.",
        steps: ["Upload your image", "Select output format", "Download converted image"],
      },
      {
        icon: Binary, label: "Image to Base64", slug: "image-to-base64", category: "image",
        desc: "Encode any image to a Base64 string for embedding in HTML/CSS.",
        isBrowserTool: true,
        seoTitle: "Image to Base64 Encoder – Free Online Tool",
        seoDesc: "Convert images to Base64 string online for free.",
        steps: ["Upload your image", "Base64 string generated", "Copy and use anywhere"],
      },
      {
        icon: Binary, label: "Base64 to Image", slug: "base64-to-image", category: "image",
        desc: "Decode a Base64 string back into a viewable and downloadable image.",
        isBrowserTool: true,
        seoTitle: "Base64 to Image Decoder – Free Online Tool",
        seoDesc: "Decode Base64 strings back to images online for free.",
        steps: ["Paste your Base64 string", "We decode the image", "Download image file"],
      },
      {
        icon: PenTool, label: "Image Watermark Adder", slug: "add-watermark-image", category: "image",
        desc: "Stamp a text or image watermark onto your photos.",
        inputLabel: "Image", inputFormat: ".jpg,.jpeg,.png,.webp",
        seoTitle: "Add Watermark to Image – Free Online Watermark Tool",
        seoDesc: "Add text or image watermarks to photos online.",
        steps: ["Upload your image", "Set watermark text", "Download watermarked image"],
      },
      {
        icon: Filter, label: "Blur Image Tool", slug: "blur-image", category: "image",
        desc: "Apply Gaussian blur or mosaic blur effects to any image.",
        inputLabel: "Image", inputFormat: ".jpg,.jpeg,.png,.webp",
        seoTitle: "Blur Image Online – Free Image Blur Tool",
        seoDesc: "Apply blur effects to images online for free.",
        steps: ["Upload your image", "Set blur intensity", "Download blurred image"],
      },
      {
        icon: Zap, label: "Image Sharpen Tool", slug: "sharpen-image", category: "image",
        desc: "Sharpen blurry or soft images to enhance clarity and detail.",
        inputLabel: "Image", inputFormat: ".jpg,.jpeg,.png,.webp",
        seoTitle: "Sharpen Image Online – Free Image Sharpener",
        seoDesc: "Sharpen images online for free with Viadocs.",
        steps: ["Upload your image", "Apply sharpening", "Download sharp image"],
      },
      {
        icon: Palette, label: "Image Color Picker", slug: "image-color-picker", category: "image",
        desc: "Pick any color from an uploaded image and get its HEX, RGB, and HSL values.",
        isBrowserTool: true,
        seoTitle: "Image Color Picker – Get HEX & RGB from Image",
        seoDesc: "Pick colors from any image and get HEX, RGB, HSL values online.",
        steps: ["Upload your image", "Click any pixel to pick color", "Copy color code"],
      },
      {
        icon: Eye, label: "Image Metadata Viewer", slug: "image-metadata", category: "image",
        desc: "View EXIF and metadata information embedded in any image file.",
        isBrowserTool: true,
        seoTitle: "Image Metadata Viewer – View EXIF Data Online",
        seoDesc: "View image EXIF and metadata information online for free.",
        steps: ["Upload your image", "Metadata is extracted", "View all image info"],
      },
      {
        icon: Maximize2, label: "Image DPI Changer", slug: "image-dpi", category: "image",
        desc: "Change the DPI (dots per inch) of any image for print or web use.",
        inputLabel: "Image", inputFormat: ".jpg,.jpeg,.png,.tiff",
        seoTitle: "Change Image DPI – Free Online DPI Changer",
        seoDesc: "Change image DPI for print or web use online for free.",
        steps: ["Upload your image", "Set desired DPI", "Download updated image"],
      },
      {
        icon: Frame, label: "Image Border Adder", slug: "image-border", category: "image",
        desc: "Add a custom border or frame around any image.",
        inputLabel: "Image", inputFormat: ".jpg,.jpeg,.png,.webp",
        seoTitle: "Add Border to Image – Free Online Image Border Tool",
        seoDesc: "Add borders and frames to images online for free.",
        steps: ["Upload your image", "Set border style & color", "Download bordered image"],
      },
      {
        icon: Maximize2, label: "Image Upscaler", slug: "image-upscale", category: "image",
        desc: "Upscale images up to 4× using high-quality resampling.",
        inputLabel: "Image", inputFormat: ".jpg,.jpeg,.png,.webp",
        seoTitle: "Upscale Image Online – Enhance Image Resolution",
        seoDesc: "Upscale and enhance image resolution online with Viadocs.",
        steps: ["Upload your image", "Upscaling resolution", "Download enhanced image"],
      },
    ],
  },

  // ─── Text Tools ──────────────────────────────────────────────────────────────
  {
    id: "text",
    label: "Text Tools",
    color: "indigo",
    icon: Type,
    tools: [
      { icon: BarChart2, label: "Word Counter", slug: "word-counter", category: "text", isBrowserTool: true, desc: "Count words, characters, sentences and paragraphs instantly.", seoTitle: "Word Counter – Free Online Word Count Tool", seoDesc: "Count words, characters, and sentences online for free.", steps: ["Paste or type your text", "Stats appear instantly", "Copy or share results"] },
      { icon: Type, label: "Character Counter", slug: "character-counter", category: "text", isBrowserTool: true, desc: "Count characters with and without spaces in any text.", seoTitle: "Character Counter – Free Online Character Count Tool", seoDesc: "Count characters in text online for free.", steps: ["Paste or type your text", "Character count shown", "Copy or share results"] },
      { icon: ArrowUpDown, label: "Case Converter", slug: "case-converter", category: "text", isBrowserTool: true, desc: "Convert text to UPPER CASE, lower case, Title Case, and more.", seoTitle: "Case Converter – Free Online Text Case Tool", seoDesc: "Convert text case online for free.", steps: ["Paste your text", "Choose case type", "Copy converted text"] },
      { icon: List, label: "Remove Duplicate Lines", slug: "remove-duplicates", category: "text", isBrowserTool: true, desc: "Remove duplicate lines from any list or text block.", seoTitle: "Remove Duplicate Lines – Free Online Text Tool", seoDesc: "Remove duplicate lines from text online.", steps: ["Paste your text", "Duplicates removed instantly", "Copy clean text"] },
      { icon: AlignJustify, label: "Text Sorter", slug: "text-sorter", category: "text", isBrowserTool: true, desc: "Sort lines alphabetically, numerically, or reverse order.", seoTitle: "Text Sorter – Sort Lines Online Free", seoDesc: "Sort text lines alphabetically or numerically online.", steps: ["Paste your text", "Choose sort order", "Copy sorted text"] },
      { icon: Shuffle, label: "Random Text Generator", slug: "random-text", category: "text", isBrowserTool: true, desc: "Generate random text, words, or sentences for testing.", seoTitle: "Random Text Generator – Free Online Tool", seoDesc: "Generate random text online for free.", steps: ["Choose text type & length", "Text is generated", "Copy and use anywhere"] },
      { icon: AlignCenter, label: "Lorem Ipsum Generator", slug: "lorem-ipsum", category: "text", isBrowserTool: true, desc: "Generate Lorem Ipsum placeholder text for designs and mockups.", seoTitle: "Lorem Ipsum Generator – Free Placeholder Text Tool", seoDesc: "Generate Lorem Ipsum text online for free.", steps: ["Choose paragraph count", "Lorem ipsum generated", "Copy and use in design"] },
      { icon: RefreshCw, label: "Text Reverser", slug: "text-reverser", category: "text", isBrowserTool: true, desc: "Reverse any text, word, or sentence character by character.", seoTitle: "Text Reverser – Reverse Text Online Free", seoDesc: "Reverse text characters or words online for free.", steps: ["Paste your text", "Text is reversed", "Copy reversed text"] },
      { icon: Link, label: "Text to Slug Converter", slug: "text-to-slug", category: "text", isBrowserTool: true, desc: "Convert any text into a URL-friendly slug for SEO.", seoTitle: "Text to Slug Converter – Free URL Slug Generator", seoDesc: "Convert text to URL slug online for free.", steps: ["Enter your text", "Slug is generated", "Copy the URL slug"] },
      { icon: AlignLeft, label: "Remove Extra Spaces", slug: "remove-spaces", category: "text", isBrowserTool: true, desc: "Remove extra spaces, tabs, and double spaces from text.", seoTitle: "Remove Extra Spaces – Free Online Text Cleaner", seoDesc: "Remove extra spaces from text online for free.", steps: ["Paste your text", "Extra spaces removed", "Copy cleaned text"] },
      { icon: Strikethrough, label: "Line Break Remover", slug: "line-break-remover", category: "text", isBrowserTool: true, desc: "Remove all line breaks and newlines from text to make it a single paragraph.", seoTitle: "Line Break Remover – Remove Newlines Online Free", seoDesc: "Remove line breaks from text online for free.", steps: ["Paste your text", "Line breaks removed", "Copy single-line text"] },
      { icon: Code, label: "Text to HTML Converter", slug: "text-to-html", category: "text", isBrowserTool: true, desc: "Convert plain text to properly escaped HTML markup.", seoTitle: "Text to HTML Converter – Free Online Tool", seoDesc: "Convert plain text to HTML online for free.", steps: ["Paste your text", "HTML is generated", "Copy HTML code"] },
      { icon: FileText, label: "HTML to Text Converter", slug: "html-to-text", category: "text", isBrowserTool: true, desc: "Strip HTML tags and extract plain text from HTML markup.", seoTitle: "HTML to Text Converter – Strip HTML Tags Online", seoDesc: "Convert HTML to plain text online for free.", steps: ["Paste your HTML", "Tags are stripped", "Copy plain text"] },
      { icon: Search, label: "Keyword Density Checker", slug: "keyword-density", category: "text", isBrowserTool: true, desc: "Analyse keyword frequency and density in any block of text.", seoTitle: "Keyword Density Checker – Free SEO Text Analyser", seoDesc: "Check keyword density in text online for free.", steps: ["Paste your text", "Keywords analysed", "View density results"] },
      { icon: Clock, label: "Reading Time Calculator", slug: "reading-time", category: "text", isBrowserTool: true, desc: "Estimate the reading time for any article or blog post.", seoTitle: "Reading Time Calculator – Free Online Tool", seoDesc: "Calculate reading time for any text online for free.", steps: ["Paste your text", "Reading time calculated", "View estimated time"] },
    ],
  },

  // ─── Developer Tools ─────────────────────────────────────────────────────────
  {
    id: "developer",
    label: "Developer Tools",
    color: "purple",
    icon: Code2,
    tools: [
      { icon: Braces, label: "JSON Formatter", slug: "json-formatter", category: "developer", isBrowserTool: true, desc: "Beautify and format JSON data with syntax highlighting.", seoTitle: "JSON Formatter – Beautify JSON Online Free", seoDesc: "Format and beautify JSON data online for free.", steps: ["Paste your JSON", "JSON is formatted", "Copy formatted JSON"] },
      { icon: Braces, label: "JSON Validator", slug: "json-validator", category: "developer", isBrowserTool: true, desc: "Validate JSON syntax and detect errors instantly.", seoTitle: "JSON Validator – Validate JSON Online Free", seoDesc: "Validate JSON syntax and find errors online.", steps: ["Paste your JSON", "Validation runs instantly", "See error details"] },
      { icon: Binary, label: "Base64 Encoder", slug: "base64-encoder", category: "developer", isBrowserTool: true, desc: "Encode any text or data to Base64 format.", seoTitle: "Base64 Encoder – Encode Text to Base64 Online", seoDesc: "Encode text and data to Base64 online for free.", steps: ["Enter text or data", "Base64 encoded instantly", "Copy encoded string"] },
      { icon: Binary, label: "Base64 Decoder", slug: "base64-decoder", category: "developer", isBrowserTool: true, desc: "Decode Base64-encoded strings back to readable text.", seoTitle: "Base64 Decoder – Decode Base64 Online Free", seoDesc: "Decode Base64 encoded strings online for free.", steps: ["Paste Base64 string", "Decoded instantly", "Copy decoded text"] },
      { icon: Link, label: "URL Encoder", slug: "url-encoder", category: "developer", isBrowserTool: true, desc: "Percent-encode special characters in URLs for safe transmission.", seoTitle: "URL Encoder – Encode URLs Online Free", seoDesc: "Encode URLs and special characters online for free.", steps: ["Enter your URL", "URL encoded instantly", "Copy encoded URL"] },
      { icon: Link, label: "URL Decoder", slug: "url-decoder", category: "developer", isBrowserTool: true, desc: "Decode percent-encoded URLs back to human-readable format.", seoTitle: "URL Decoder – Decode URLs Online Free", seoDesc: "Decode percent-encoded URLs online for free.", steps: ["Enter encoded URL", "URL decoded instantly", "Copy decoded URL"] },
      { icon: FileCode, label: "HTML Formatter", slug: "html-formatter", category: "developer", isBrowserTool: true, desc: "Beautify and format HTML code with proper indentation.", seoTitle: "HTML Formatter – Beautify HTML Online Free", seoDesc: "Format and beautify HTML code online for free.", steps: ["Paste your HTML", "HTML is formatted", "Copy formatted code"] },
      { icon: Palette, label: "CSS Minifier", slug: "css-minifier", category: "developer", isBrowserTool: true, desc: "Minify CSS code to reduce file size for faster loading.", seoTitle: "CSS Minifier – Minify CSS Online Free", seoDesc: "Minify CSS code online for free.", steps: ["Paste your CSS", "CSS is minified", "Copy minified code"] },
      { icon: Palette, label: "CSS Beautifier", slug: "css-beautifier", category: "developer", isBrowserTool: true, desc: "Beautify and format minified CSS code with proper indentation.", seoTitle: "CSS Beautifier – Format CSS Online Free", seoDesc: "Beautify and format CSS code online for free.", steps: ["Paste your CSS", "CSS is beautified", "Copy formatted code"] },
      { icon: Terminal, label: "JavaScript Minifier", slug: "js-minifier", category: "developer", isBrowserTool: true, desc: "Minify JavaScript code to reduce bundle size.", seoTitle: "JavaScript Minifier – Minify JS Online Free", seoDesc: "Minify JavaScript code online for free.", steps: ["Paste your JS", "JS is minified", "Copy minified code"] },
      { icon: Terminal, label: "JavaScript Beautifier", slug: "js-beautifier", category: "developer", isBrowserTool: true, desc: "Beautify and format minified JavaScript code.", seoTitle: "JavaScript Beautifier – Format JS Online Free", seoDesc: "Beautify JavaScript code online for free.", steps: ["Paste your JS", "JS is beautified", "Copy formatted code"] },
      { icon: FileCode, label: "XML Formatter", slug: "xml-formatter", category: "developer", isBrowserTool: true, desc: "Format and validate XML documents with proper indentation.", seoTitle: "XML Formatter – Format XML Online Free", seoDesc: "Format and beautify XML code online for free.", steps: ["Paste your XML", "XML is formatted", "Copy formatted XML"] },
      { icon: Regex, label: "Regex Tester", slug: "regex-tester", category: "developer", isBrowserTool: true, desc: "Test and debug regular expressions with live match highlighting.", seoTitle: "Regex Tester – Test Regular Expressions Online Free", seoDesc: "Test and debug regular expressions online for free.", steps: ["Enter your regex", "Enter test string", "See live matches"] },
      { icon: FileCode, label: "Markdown to HTML", slug: "markdown-to-html", category: "developer", isBrowserTool: true, desc: "Convert Markdown text into clean, formatted HTML code.", seoTitle: "Markdown to HTML Converter – Free Online Tool", seoDesc: "Convert Markdown to HTML online for free.", steps: ["Paste your Markdown", "HTML is generated", "Copy HTML code"] },
      { icon: BookOpen, label: "HTML to Markdown", slug: "html-to-markdown", category: "developer", isBrowserTool: true, desc: "Convert HTML markup into clean Markdown syntax.", seoTitle: "HTML to Markdown Converter – Free Online Tool", seoDesc: "Convert HTML to Markdown online for free.", steps: ["Paste your HTML", "Markdown generated", "Copy Markdown"] },
    ],
  },

  // ─── Security & Generator Tools ──────────────────────────────────────────────
  {
    id: "security",
    label: "Security & Generator Tools",
    color: "orange",
    icon: Shield,
    tools: [
      { icon: Key, label: "Password Generator", slug: "password-generator", category: "security", isBrowserTool: true, desc: "Generate strong, secure random passwords with custom rules.", seoTitle: "Password Generator – Create Strong Passwords Online", seoDesc: "Generate strong and secure passwords online for free.", steps: ["Set password options", "Password generated", "Copy and use it"] },
      { icon: Shield, label: "Password Strength Checker", slug: "password-checker", category: "security", isBrowserTool: true, desc: "Check the strength of any password and get improvement tips.", seoTitle: "Password Strength Checker – Free Online Tool", seoDesc: "Check password strength online for free.", steps: ["Enter your password", "Strength analysed instantly", "See improvement tips"] },
      { icon: Dice1, label: "Random Number Generator", slug: "random-number", category: "security", isBrowserTool: true, desc: "Generate random numbers within any custom range.", seoTitle: "Random Number Generator – Free Online Tool", seoDesc: "Generate random numbers online for free.", steps: ["Set min & max range", "Number generated", "Copy the result"] },
      { icon: Fingerprint, label: "UUID Generator", slug: "uuid-generator", category: "security", isBrowserTool: true, desc: "Generate universally unique identifiers (UUID v4) instantly.", seoTitle: "UUID Generator – Generate UUID Online Free", seoDesc: "Generate UUID v4 identifiers online for free.", steps: ["Click generate", "UUID created instantly", "Copy UUID"] },
      { icon: Hash, label: "Hash Generator", slug: "hash-generator", category: "security", isBrowserTool: true, desc: "Generate MD5, SHA-1, SHA-256 and SHA-512 hashes from any text.", seoTitle: "Hash Generator – MD5 & SHA256 Online Free", seoDesc: "Generate MD5, SHA256, SHA512 hashes online for free.", steps: ["Enter your text", "Select hash type", "Copy the hash"] },
      { icon: Unlock, label: "Hash Decoder", slug: "hash-decoder", category: "security", isBrowserTool: true, desc: "Try to reverse common MD5 and SHA-1 hashes using a lookup database.", seoTitle: "Hash Decoder – Reverse Hash Online Free", seoDesc: "Decode and reverse common hashes online for free.", steps: ["Enter the hash", "Lookup performed", "View original text"] },
      { icon: Key, label: "Secure Token Generator", slug: "token-generator", category: "security", isBrowserTool: true, desc: "Generate cryptographically secure random tokens for authentication.", seoTitle: "Secure Token Generator – Free Online Tool", seoDesc: "Generate secure random tokens online for free.", steps: ["Set token length", "Token generated", "Copy secure token"] },
      { icon: User, label: "Fake Data Generator", slug: "fake-data", category: "security", isBrowserTool: true, desc: "Generate realistic fake names, emails, addresses, and more for testing.", seoTitle: "Fake Data Generator – Free Online Test Data Tool", seoDesc: "Generate fake test data online for free.", steps: ["Choose data types", "Data generated", "Copy or export data"] },
      { icon: AtSign, label: "Username Generator", slug: "username-generator", category: "security", isBrowserTool: true, desc: "Generate creative and unique usernames from keywords or at random.", seoTitle: "Username Generator – Free Online Username Creator", seoDesc: "Generate unique usernames online for free.", steps: ["Enter keyword (optional)", "Usernames generated", "Pick your favourite"] },
      { icon: Cpu, label: "API Key Generator", slug: "api-key-generator", category: "security", isBrowserTool: true, desc: "Generate random, secure API keys of any desired length.", seoTitle: "API Key Generator – Generate API Keys Online Free", seoDesc: "Generate secure API keys online for free.", steps: ["Set key length & format", "API key generated", "Copy and use it"] },
    ],
  },

  // ─── Web & SEO Tools ─────────────────────────────────────────────────────────
  {
    id: "web",
    label: "Web & SEO Tools",
    color: "green",
    icon: Globe,
    tools: [
      { icon: QrCode, label: "QR Code Generator", slug: "qr-generator", category: "web", isBrowserTool: true, desc: "Generate QR codes for URLs, text, email, phone numbers, and more.", seoTitle: "QR Code Generator – Create QR Codes Online Free", seoDesc: "Generate QR codes for any content online for free.", steps: ["Enter content or URL", "QR code generated", "Download QR code"] },
      { icon: ScanLine, label: "QR Code Reader", slug: "qr-reader", category: "web", isBrowserTool: true, desc: "Upload or capture a QR code image to decode its content instantly.", seoTitle: "QR Code Reader – Scan & Decode QR Codes Online", seoDesc: "Read and decode QR codes online for free.", steps: ["Upload QR code image", "Content decoded", "View decoded data"] },
      { icon: Link, label: "URL Slug Generator", slug: "slug-generator", category: "web", isBrowserTool: true, desc: "Turn any title or phrase into a clean SEO-friendly URL slug.", seoTitle: "URL Slug Generator – Free SEO Slug Creator", seoDesc: "Generate SEO-friendly URL slugs online for free.", steps: ["Enter your title", "Slug generated", "Copy the slug"] },
      { icon: Tag, label: "Meta Tag Generator", slug: "meta-tag-generator", category: "web", isBrowserTool: true, desc: "Generate SEO meta tags including title, description, and Open Graph tags.", seoTitle: "Meta Tag Generator – Free SEO Meta Tags Tool", seoDesc: "Generate SEO meta tags for your website online for free.", steps: ["Fill in page details", "Meta tags generated", "Copy HTML code"] },
      { icon: Rss, label: "Sitemap Generator", slug: "sitemap-generator", category: "web", isBrowserTool: true, desc: "Create an XML sitemap for your website to improve SEO indexing.", seoTitle: "Sitemap Generator – Create XML Sitemap Online Free", seoDesc: "Generate XML sitemaps for your website online for free.", steps: ["Enter your URLs", "Sitemap XML generated", "Download sitemap.xml"] },
      { icon: FileCode, label: "Robots.txt Generator", slug: "robots-generator", category: "web", isBrowserTool: true, desc: "Generate a robots.txt file with custom rules for search engine crawlers.", seoTitle: "Robots.txt Generator – Free Online Tool", seoDesc: "Generate robots.txt files for your website online for free.", steps: ["Set crawl rules", "Robots.txt generated", "Download the file"] },
      { icon: Globe, label: "Open Graph Generator", slug: "og-generator", category: "web", isBrowserTool: true, desc: "Generate Open Graph and Twitter Card meta tags for social sharing previews.", seoTitle: "Open Graph Generator – Free OG Tags Tool", seoDesc: "Generate Open Graph meta tags online for free.", steps: ["Enter page details", "OG tags generated", "Copy HTML tags"] },
      { icon: Search, label: "Google SERP Preview", slug: "serp-preview", category: "web", isBrowserTool: true, desc: "Preview how your page will appear in Google search results.", seoTitle: "Google SERP Preview Tool – Free Online SEO Tool", seoDesc: "Preview your Google search result snippet online for free.", steps: ["Enter title & description", "SERP preview shown", "Optimise your snippet"] },
      { icon: Camera, label: "Website Screenshot Tool", slug: "website-screenshot", category: "web", isBrowserTool: true, desc: "Capture a screenshot of any website URL for preview or archiving.", seoTitle: "Website Screenshot Tool – Free Online Tool", seoDesc: "Capture website screenshots online for free.", steps: ["Enter website URL", "Screenshot captured", "Download screenshot"] },
      { icon: TrendingUp, label: "Domain Age Checker", slug: "domain-age", category: "web", isBrowserTool: true, desc: "Check the registration date and age of any domain name.", seoTitle: "Domain Age Checker – Free Online Domain Tool", seoDesc: "Check domain age and registration date online for free.", steps: ["Enter domain name", "Age data fetched", "View domain info"] },
    ],
  },

  // ─── Utility Tools ───────────────────────────────────────────────────────────
  {
    id: "utility",
    label: "Utility Tools",
    color: "rose",
    icon: Calculator,
    tools: [
      { icon: ArrowUpDown, label: "Unit Converter", slug: "unit-converter", category: "utility", isBrowserTool: true, desc: "Convert between length, weight, temperature, area, and more units.", seoTitle: "Unit Converter – Free Online Conversion Tool", seoDesc: "Convert units of measurement online for free.", steps: ["Select unit type", "Enter value & units", "See converted result"] },
      { icon: DollarSign, label: "Currency Converter", slug: "currency-converter", category: "utility", isBrowserTool: true, desc: "Convert between world currencies with live exchange rates.", seoTitle: "Currency Converter – Free Online Exchange Rate Tool", seoDesc: "Convert currencies with live rates online for free.", steps: ["Select currencies", "Enter amount", "See converted value"] },
      { icon: Percent, label: "Percentage Calculator", slug: "percentage-calc", category: "utility", isBrowserTool: true, desc: "Calculate percentages, percentage change, and percentage of a value.", seoTitle: "Percentage Calculator – Free Online Tool", seoDesc: "Calculate percentages online for free.", steps: ["Enter values", "Select calculation type", "See result instantly"] },
      { icon: User, label: "Age Calculator", slug: "age-calculator", category: "utility", isBrowserTool: true, desc: "Calculate your exact age in years, months, days, hours, and minutes.", seoTitle: "Age Calculator – Calculate Exact Age Online Free", seoDesc: "Calculate your exact age online for free.", steps: ["Enter date of birth", "Current age calculated", "View detailed breakdown"] },
      { icon: MapPin, label: "Time Zone Converter", slug: "timezone-converter", category: "utility", isBrowserTool: true, desc: "Convert times between any two time zones around the world.", seoTitle: "Time Zone Converter – Free World Clock Tool", seoDesc: "Convert time zones online for free.", steps: ["Select time zones", "Enter time to convert", "See converted time"] },
      { icon: Activity, label: "BMI Calculator", slug: "bmi-calculator", category: "utility", isBrowserTool: true, desc: "Calculate your Body Mass Index (BMI) and check your health category.", seoTitle: "BMI Calculator – Free Body Mass Index Calculator", seoDesc: "Calculate BMI online for free.", steps: ["Enter height & weight", "BMI calculated", "View health category"] },
      { icon: DollarSign, label: "Loan EMI Calculator", slug: "emi-calculator", category: "utility", isBrowserTool: true, desc: "Calculate monthly EMI, total interest, and total amount for any loan.", seoTitle: "Loan EMI Calculator – Free Online EMI Tool", seoDesc: "Calculate loan EMI online for free.", steps: ["Enter loan details", "EMI calculated", "View payment breakdown"] },
      { icon: Percent, label: "Tip Calculator", slug: "tip-calculator", category: "utility", isBrowserTool: true, desc: "Calculate the tip amount and split the bill among any number of people.", seoTitle: "Tip Calculator – Free Online Bill Split Tool", seoDesc: "Calculate tips and split bills online for free.", steps: ["Enter bill amount", "Set tip percentage", "See split per person"] },
      { icon: Shuffle, label: "Random Name Picker", slug: "random-picker", category: "utility", isBrowserTool: true, desc: "Pick a random name or item from any list — great for giveaways.", seoTitle: "Random Name Picker – Free Online Picker Tool", seoDesc: "Pick random names from a list online for free.", steps: ["Enter list of names", "Click pick random", "Winner is selected"] },
      { icon: Timer, label: "Countdown Timer", slug: "countdown-timer", category: "utility", isBrowserTool: true, desc: "Set a countdown timer for any duration with alarm notification.", seoTitle: "Countdown Timer – Free Online Timer Tool", seoDesc: "Create countdown timers online for free.", steps: ["Set duration", "Start countdown", "Get notified when done"] },
    ],
  },
];

// Flat map for easy slug lookup
export const allTools: ToolEntry[] = toolCategories.flatMap(c => c.tools);

export const getToolBySlug = (slug: string): ToolEntry | undefined =>
  allTools.find(t => t.slug === slug);

export const getCategoryColorVars = (color: ToolCategory["color"]) => {
  const map: Record<string, string> = {
    blue:   "var(--brand-blue)",
    teal:   "var(--brand-teal)",
    indigo: "var(--brand-indigo)",
    purple: "220, 80%, 60%",
    orange: "25, 95%, 55%",
    green:  "145, 65%, 42%",
    rose:   "345, 80%, 55%",
  };
  return map[color] ?? map.blue;
};
