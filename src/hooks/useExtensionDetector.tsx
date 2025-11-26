// // hooks/useExtensionDetector.tsx
// "use client";
// import { useEffect, useRef } from "react";

// type DetectionRecord = {
//   id: string;
//   type: "VISIBLE_EXTENSION";
//   description: string;
//   timestamp: string;
// };

// export function useExtensionDetector() {
//   const detections = useRef<DetectionRecord[]>([]);
//   const detectedIds = useRef<Set<string>>(new Set());

//   const showToast = (message: string) => {
//     if (typeof window !== 'undefined' && (window as any).toast?.error) {
//       (window as any).toast.error(`🚫 ${message}`, {
//         duration: 5000,
//         style: {
//           background: "#dc3545",
//           color: "white",
//         },
//       });
//     }
//   };

//   // Проверка по ключевым словам в классах и ID
//   const checkForExtensionElements = () => {
//     try {
//       // Ищем все элементы с ключевыми словами расширений
//       const allElements = document.querySelectorAll('*');

//       allElements.forEach(element => {
//         if (!isElementVisible(element)) return;

//         const className = element.className?.toString().toLowerCase() || '';
//         const id = element.id?.toLowerCase() || '';
//         const tagName = element.tagName?.toLowerCase() || '';

//         // Ключевые слова популярных расширений
//         const extensionKeywords = [
//           'ninja', 'zilla', 'grammarly', 'lastpass', 'bitwarden', '1password',
//           'adblock', 'ublock', 'whatfont', 'fount', 'eyedropper', 'colorpicker',
//           'password', 'extension', 'crx', 'chrome-extension'
//         ];

//         const hasExtensionKeyword = extensionKeywords.some(keyword =>
//           className.includes(keyword) ||
//           id.includes(keyword)
//         );

//         if (hasExtensionKeyword) {
//           const extensionName = getExtensionNameFromKeywords(className + ' ' + id);
//           const elementKey = `${extensionName}-${className}-${id}`;

//           if (!detectedIds.current.has(elementKey)) {
//             detectedIds.current.add(elementKey);

//             const record: DetectionRecord = {
//               id: Date.now().toString() + Math.random(),
//               type: "VISIBLE_EXTENSION",
//               description: `Обнаружено расширение: ${extensionName}`,
//               timestamp: new Date().toISOString(),
//             };

//             detections.current.push(record);
//             showToast(`Обнаружено расширение: ${extensionName}`);
//           }
//         }
//       });
//     } catch (error) {
//       console.log('Extension check error:', error);
//     }
//   };

//   // Проверка элементов с высоким z-index (popup окна)
//   const checkHighZIndexElements = () => {
//     try {
//       const highZIndexElements = document.querySelectorAll('*');

//       highZIndexElements.forEach(element => {
//         if (!isElementVisible(element)) return;

//         const style = window.getComputedStyle(element);
//         const zIndex = parseInt(style.zIndex);

//         // Элементы с очень высоким z-index (обычно popup расширений)
//         if (zIndex > 10000 && isPopupLikeElement(element)) {
//           const extensionName = 'Popup расширение';
//           const elementKey = `popup-${zIndex}-${element.className}`;

//           if (!detectedIds.current.has(elementKey)) {
//             detectedIds.current.add(elementKey);

//             const record: DetectionRecord = {
//               id: Date.now().toString() + Math.random(),
//               type: "VISIBLE_EXTENSION",
//               description: `Обнаружено popup окно расширения`,
//               timestamp: new Date().toISOString(),
//             };

//             detections.current.push(record);
//             showToast(`Обнаружено popup окно расширения`);
//           }
//         }
//       });
//     } catch (error) {
//       console.log('Z-index check error:', error);
//     }
//   };

//   const isElementVisible = (element: Element): boolean => {
//     try {
//       const style = window.getComputedStyle(element);
//       const rect = element.getBoundingClientRect();

//       return (
//         style.display !== 'none' &&
//         style.visibility !== 'hidden' &&
//         style.opacity !== '0' &&
//         rect.width > 10 &&
//         rect.height > 10 &&
//         rect.top >= 0 &&
//         rect.left >= 0 &&
//         rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
//         rect.right <= (window.innerWidth || document.documentElement.clientWidth)
//       );
//     } catch {
//       return false;
//     }
//   };

//   const isPopupLikeElement = (element: Element): boolean => {
//     const style = window.getComputedStyle(element);
//     const rect = element.getBoundingClientRect();

//     return (
//       style.position === 'fixed' &&
//       rect.width > 100 &&
//       rect.height > 50 &&
//       rect.top < window.innerHeight - 100 && // Не в самом низу
//       rect.left < window.innerWidth - 100 // Не с краю
//     );
//   };

//   const getExtensionNameFromKeywords = (text: string): string => {
//     const lowerText = text.toLowerCase();

//     if (lowerText.includes('ninja')) return 'Fonts Ninja';
//     if (lowerText.includes('zilla')) return 'ColorZilla';
//     if (lowerText.includes('grammarly')) return 'Grammarly';
//     if (lowerText.includes('lastpass')) return 'LastPass';
//     if (lowerText.includes('bitwarden')) return 'Bitwarden';
//     if (lowerText.includes('1password')) return '1Password';
//     if (lowerText.includes('whatfont')) return 'WhatFont';
//     if (lowerText.includes('fount')) return 'Fount';
//     if (lowerText.includes('eyedropper') || lowerText.includes('colorpicker')) return 'Color Picker';
//     if (lowerText.includes('adblock') || lowerText.includes('ublock')) return 'Ad Blocker';

//     return 'Браузерное расширение';
//   };

//   useEffect(() => {
//     const observer = new MutationObserver((mutations) => {
//       let shouldCheck = false;

//       mutations.forEach((mutation) => {
//         mutation.addedNodes.forEach((node) => {
//           if (node.nodeType === Node.ELEMENT_NODE) {
//             shouldCheck = true;
//           }
//         });
//       });

//       if (shouldCheck) {
//         setTimeout(() => {
//           checkForExtensionElements();
//           checkHighZIndexElements();
//         }, 100);
//       }
//     });

//     // Начальная проверка с задержкой
//     setTimeout(() => {
//       checkForExtensionElements();
//       checkHighZIndexElements();
//     }, 3000);

//     // Запуск наблюдателя
//     observer.observe(document.body, {
//       childList: true,
//       subtree: true,
//       attributes: true,
//       attributeFilter: ['class', 'id', 'style']
//     });

//     // Периодическая проверка
//     const interval = setInterval(() => {
//       checkForExtensionElements();
//       checkHighZIndexElements();
//     }, 5000);

//     return () => {
//       observer.disconnect();
//       clearInterval(interval);
//     };
//   }, []);

//   const getMetrics = () => {
//     return {
//       detections: [...detections.current],
//       summary: {
//         total: detections.current.length,
//         lastDetection: detections.current[detections.current.length - 1]?.timestamp || null
//       }
//     };
//   };

//   return {
//     getMetrics
//   };
// }