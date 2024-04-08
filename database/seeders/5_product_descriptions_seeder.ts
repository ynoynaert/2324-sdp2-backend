import ProductDescription from '#models/products/product_description'
import { BaseSeeder } from '@adonisjs/lucid/seeders'

export default class extends BaseSeeder {
  async run() {
    await ProductDescription.createMany([
      {
        productId: 1,
        languageId: 2,
        listerDescription:
          'Upgrade your workspace with our ergonomic office chair. Designed for comfort and productivity, this chair features adjustable lumbar support, padded armrests, and a breathable mesh backrest. Enhance your workday with superior comfort and support.',
        shortDescription:
          'Ergonomic office chair with adjustable lumbar support, padded armrests, and breathable mesh backrest for ultimate comfort and productivity.',
        longDescription:
          "Maximize your comfort and productivity with our ergonomic office chair. Crafted for long hours of sitting, this chair features adjustable lumbar support, padded armrests, and a breathable mesh backrest. The ergonomic design ensures that you can maintain proper posture and reduce strain on your back, neck, and shoulders. Whether you're working on important projects or catching up on emails, our office chair offers the perfect blend of comfort and support. Upgrade your workspace and enhance your workday with superior comfort and productivity.",
      },
      {
        productId: 2,
        languageId: 2,
        listerDescription:
          "Optimize your workspace with our sleek and functional office desk. Designed for modern professionals, this desk features ample surface area for all your work essentials. With its minimalist design and sturdy construction, it's the perfect addition to any office or home workspace.",
        shortDescription:
          'Sleek and functional office desk with ample surface area for work essentials.',
        longDescription:
          "Maximize your productivity with our sleek and functional office desk. Crafted for modern professionals, this desk offers ample surface area for all your work essentials. The spacious desktop provides plenty of room for your computer, paperwork, and other office supplies, making it easy to stay organized and focused. The minimalist design and sturdy construction ensure that this desk is the perfect addition to any office or home workspace. Whether you're working on important projects or catching up on emails, our office desk offers the perfect blend of style and functionality. Optimize your workspace and elevate your workday with our sleek and functional office desk today.",
      },
      {
        productId: 3,
        languageId: 2,
        listerDescription:
          "Stock up on essential office supplies with our premium copy paper. Designed for high-quality printing and copying, this paper ensures crisp and clear results every time. Whether you're printing reports, memos, or presentations, our copy paper delivers professional-grade performance.",
        shortDescription: 'Premium copy paper for high-quality printing and copying.',
        longDescription:
          "Elevate your printing and copying experience with our premium copy paper. Engineered for exceptional performance, this paper is designed to deliver crisp, clear, and professional-grade results. Whether you're printing reports, memos, presentations, or other documents, our copy paper ensures that your work looks its best. The bright white color provides a clean and professional backdrop for text and images, making your documents easy to read and visually appealing. With its smooth surface and reliable performance, our copy paper is the perfect choice for all your office printing and copying needs. Stock up on this essential office supply and experience the difference in quality and performance.",
      },
      {
        productId: 4,
        languageId: 2,
        listerDescription:
          "Keep your office printer running smoothly with our high-quality ink cartridges. Designed for reliable performance and consistent results, our ink cartridges deliver exceptional print quality and clarity. Whether you're printing documents, photos, or other materials, our ink cartridges ensure that your work looks its best.",
        shortDescription:
          'High-quality ink cartridges for reliable performance and exceptional print quality.',
        longDescription:
          "Maximize the performance of your office printer with our high-quality ink cartridges. Engineered for reliability and consistency, our ink cartridges deliver exceptional print quality and clarity, ensuring that your documents, photos, and other materials look their best. The advanced ink formula provides vibrant colors and sharp details, making your work stand out with professional-grade results. Whether you're printing reports, presentations, or marketing materials, our ink cartridges offer the perfect combination of performance and value. Keep your office printer running smoothly and produce outstanding printouts with our premium ink cartridges.",
      },
      {
        productId: 5,
        languageId: 2,
        listerDescription:
          "Upgrade your office with our high-performance printer. Designed for speed, efficiency, and quality, this printer delivers exceptional results for all your printing needs. Whether you're producing reports, marketing materials, or other documents, our printer offers the perfect combination of performance and reliability.",
        shortDescription: 'High-performance printer for speed, efficiency, and quality printing.',
        longDescription:
          "Elevate your office printing experience with our high-performance printer. Engineered for speed, efficiency, and quality, this printer delivers exceptional results for all your printing needs. The fast printing speed ensures that you can produce documents, reports, and marketing materials with ease and efficiency. The advanced printing technology provides crisp, clear, and vibrant results, making your work stand out with professional-grade quality. Whether you're printing text, images, or graphics, our printer offers the perfect combination of performance and reliability. Upgrade your office with our high-performance printer and experience the difference in speed, efficiency, and quality.",
      },
      {
        productId: 6,
        languageId: 2,
        listerDescription:
          'Enhance your office productivity with our powerful software suite. Designed to streamline your workflow and boost efficiency, our software suite offers a comprehensive set of tools for all your business needs. From document management to data analysis, our software suite has you covered.',
        shortDescription:
          'Powerfull software suite for streamlining workflow and boosting efficiency.',
        longDescription:
          "Maximize your office productivity with our powerful software suite. Crafted to streamline your workflow and boost efficiency, our software suite offers a comprehensive set of tools for all your business needs. Whether you're managing documents, analyzing data, or communicating with your team, our software suite has you covered. The intuitive interface and user-friendly design make it easy to navigate and utilize the full range of features. From creating professional documents to conducting in-depth data analysis, our software suite provides the perfect solution for all your business tasks. Enhance your office productivity and streamline your operations with our powerful software suite today.",
      },
      {
        productId: 7,
        languageId: 1,
        listerDescription:
          'Upgrade your workspace with our ergonomic office chair. Designed for comfort and productivity, this chair features adjustable lumbar support, padded armrests, and a breathable mesh backrest. Enhance your workday with superior comfort and support.',
        shortDescription:
          'Ergonomic office chair with adjustable lumbar support, padded armrests, and breathable mesh backrest for ultimate comfort and productivity.',
        longDescription:
          "Maximize your comfort and productivity with our ergonomic office chair. Crafted for long hours of sitting, this chair features adjustable lumbar support, padded armrests, and a breathable mesh backrest. The ergonomic design ensures that you can maintain proper posture and reduce strain on your back, neck, and shoulders. Whether you're working on important projects or catching up on emails, our office chair offers the perfect blend of comfort and support. Upgrade your workspace and enhance your workday with superior comfort and productivity.",
      },
      {
        productId: 8,
        languageId: 1,
        listerDescription:
          "Optimize your workspace with our sleek and functional office desk. Designed for modern professionals, this desk features ample surface area for all your work essentials. With its minimalist design and sturdy construction, it's the perfect addition to any office or home workspace.",
        shortDescription:
          'Sleek and functional office desk with ample surface area for work essentials.',
        longDescription:
          "Maximize your productivity with our sleek and functional office desk. Crafted for modern professionals, this desk offers ample surface area for all your work essentials. The spacious desktop provides plenty of room for your computer, paperwork, and other office supplies, making it easy to stay organized and focused. The minimalist design and sturdy construction ensure that this desk is the perfect addition to any office or home workspace. Whether you're working on important projects or catching up on emails, our office desk offers the perfect blend of style and functionality. Optimize your workspace and elevate your workday with our sleek and functional office desk today.",
      },
      {
        productId: 9,
        languageId: 1,
        listerDescription:
          "Stock up on essential office supplies with our premium copy paper. Designed for high-quality printing and copying, this paper ensures crisp and clear results every time. Whether you're printing reports, memos, or presentations, our copy paper delivers professional-grade performance.",
        shortDescription:
          'A pencil is a versatile writing tool consisting of a thin cylindrical shaft typically made of wood encasing a graphite or charcoal core. Widely used for writing, sketching, and drawing, it leaves a mark on paper through the friction of its graphite tip. Pencils come in various lead grades for different purposes, ranging from soft to hard, and are easily erasable, making them a popular choice for both artists and students.',
        longDescription:
          'A pencil is a classic writing and drawing tool consisting of a slender shaft made of wood, enclosing a core of graphite or charcoal. It features a sharpened point for precise marks and often includes an eraser for easy correction. Available in various grades, from soft to hard, pencils are versatile and widely used by artists, students, and professionals for their ease of use, affordability, and enduring appeal.',
      },
      {
        productId: 10,
        languageId: 1,
        listerDescription:
          "Unleash your creativity with our cutting-edge digital pen. Combining precision and versatility, this pen offers a seamless transition from traditional to digital drawing. With pressure sensitivity and customizable buttons, it's the perfect tool for artists, designers, and note-takers alike.",
        shortDescription:
          'Versatile digital pen with pressure sensitivity and customizable buttons for seamless drawing and note-taking.',
        longDescription:
          "Experience the future of drawing and note-taking with our state-of-the-art digital pen. Engineered with precision and innovation, this pen bridges the gap between traditional and digital media, offering a seamless transition for artists, designers, and professionals. Featuring advanced pressure sensitivity technology, this pen delivers unparalleled control and accuracy, allowing you to create intricate strokes and fine details with ease. Whether you're sketching, illustrating, or annotating documents, every stroke feels natural and responsive, mimicking the feel of traditional pen and paper.",
      },
      {
        productId: 11,
        languageId: 1,
        listerDescription:
          "Elevate your note-taking experience with our premium notebook. Featuring high-quality paper, a durable cover, and convenient size, this notebook is perfect for professionals, students, and creatives alike. Whether you're jotting down ideas, sketching designs, or organizing your thoughts, our notebook is the ideal companion for all your endeavors.",
        shortDescription:
          'Premium notebook with high-quality paper and durable cover for versatile note-taking and sketching.',
        longDescription:
          "Discover the perfect balance of style and functionality with our premium notebook. Crafted with meticulous attention to detail, this notebook is designed to enhance your note-taking experience and inspire creativity in every page. Featuring high-quality paper with a smooth texture, our notebook provides the perfect canvas for your thoughts, ideas, and sketches. Whether you prefer writing with pen, pencil, or markers, the paper's thickness ensures minimal bleed-through, preserving the integrity of your work.",
      },
      {
        productId: 12,
        languageId: 1,
        listerDescription:
          "Efficiency meets precision with our advanced calculator. Designed for professionals, students, and anyone in need of accurate calculations, this sleek device offers a range of functions to streamline your work. With its user-friendly interface and ergonomic design, it's the perfect tool for tackling complex equations and everyday math tasks with ease.",
        shortDescription:
          'Advanced calculator with ergonomic design for accurate and efficient calculations.',
        longDescription:
          "Experience unparalleled accuracy and efficiency with our advanced calculator. Engineered with precision in mind, this sleek device is equipped with a wide range of functions to meet the demands of professionals, students, and anyone in need of reliable calculations. Whether you're solving complex equations, analyzing data, or managing finances, our calculator delivers accurate results every time. The user-friendly interface allows for intuitive operation, while the ergonomic design ensures comfortable use during extended periods of calculation.",
      },
      {
        productId: 13,
        languageId: 1,
        listerDescription:
          'Transform your brainstorming sessions and presentations with our versatile whiteboard. Featuring a smooth surface for effortless writing and erasing, this durable board is the perfect canvas for capturing ideas, diagrams, and notes. Whether in the office, classroom, or home, our whiteboard offers endless possibilities for collaboration and creativity.',
        shortDescription: 'Versatile whiteboard with smooth surface for easy writing and erasing.',
        longDescription:
          "Elevate your brainstorming sessions and presentations with our versatile whiteboard. Designed to foster collaboration and creativity, this durable board provides a smooth surface for effortless writing and erasing, ensuring that ideas flow freely without interruption. Whether you're outlining strategies in the boardroom, teaching concepts in the classroom, or organizing tasks at home, our whiteboard offers endless possibilities for communication and expression. The spacious surface provides ample room for diagrams, charts, notes, and more, allowing you to capture and visualize ideas with clarity and precision.",
      },
      {
        productId: 14,
        languageId: 1,
        listerDescription:
          'Multi-grade engine oil Rust and wear inhibited Offers enhanced performance versus mono-grade oils Engineered for general aviation wear, rust and corrosion issues Provides excellent engine and component cleanliness',
        shortDescription: 'Best of the best engine oil, rust and wear inhibited.',
        longDescription:
          'Multi-grade engine oil Rust and wear inhibited Offers enhanced performance versus mono-grade oils Engineered for general aviation wear, rust and corrosion issues Provides excellent engine and component cleanliness',
      },
      {
        productId: 15,
        languageId: 1,
        listerDescription:
          'FlexPower™ - advanced power management system with cell phone and music interface jacks. Includes builtin recharging system. Comfort Cam™ - technology offers quick and easy tension control for clamp-free flying.',
        shortDescription:
          'The Telex Heli-XT represents the latest in Active Noise Reduction design.',
        longDescription:
          'FlexPower™ - advanced power management system with cell phone and music interface jacks. Includes builtin recharging system. Comfort Cam™ - technology offers quick and easy tension control for clamp-free flying.',
      },
      {
        productId: 16,
        languageId: 1,
        listerDescription:
          'Nio 2MP offers you exactly those tools that will make a difference. It boasts no less than 701 JNDs, so you can read detailed images with confidence. Its high luminance, I-Guard and Uniform Luminance technologies offer you a bright and stable screen quality. And the display also contains our SteadyColor and SteadyGray technologies for stable colors and grays. In any imaging modality.',
        shortDescription:
          'Our Nio Color 2MP display is part of a range of modern radiology monitors that gives you what you need. No fluff, no overload of functionalities. But a sleek thin bezel design and just those tools and technologies that help you process cases effortlessly and efficiently.',
        longDescription:
          'Nio 2MP offers you exactly those tools that will make a difference. It boasts no less than 701 JNDs, so you can read detailed images with confidence. Its high luminance, I-Guard and Uniform Luminance technologies offer you a bright and stable screen quality. And the display also contains our SteadyColor and SteadyGray technologies for stable colors and grays. In any imaging modality.',
      },
      {
        productId: 17,
        languageId: 1,
        listerDescription:
          'Up to native 4K resolution @120-240Hz framerate for incredible image performance. Dynamic resolution of 4K (F400-4K) or way beyond (F400-N4K) with built-in or external pixel-shift. Revolutionary high-speed laser light source for speckle-free, outstanding image quality. Rock-solid and fully rated for shock and vibration. Barco Pulse for common communication and user interface across all Barco projectors. Compatible with all current FLD/FLDX type lenses 5 years limited warranty on parts and labor',
        shortDescription:
          'Extreme situations bring out your instincts. And your instincts are only as good as your training.',
        longDescription:
          'Up to native 4K resolution @120-240Hz framerate for incredible image performance. Dynamic resolution of 4K (F400-4K) or way beyond (F400-N4K) with built-in or external pixel-shift. Revolutionary high-speed laser light source for speckle-free, outstanding image quality. Rock-solid and fully rated for shock and vibration. Barco Pulse for common communication and user interface across all Barco projectors. Compatible with all current FLD/FLDX type lenses 5 years limited warranty on parts and labor',
      },
    ])
  }
}
