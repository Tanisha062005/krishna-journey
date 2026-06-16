import React, { useState, useEffect, useRef } from 'react';
import Lenis from 'lenis';
import Navbar from './components/Navbar';
import HeroBanner from './components/HeroBanner';
import TimelineCarousel from './components/TimelineCarousel';
import ChapterDetailsCard from './components/ChapterDetailsCard';
import RightSidebar from './components/RightSidebar';
import AudioPlayer from './components/AudioPlayer';
import EpilogueOverlay from './components/EpilogueOverlay';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu } from 'lucide-react';
import VideoModal from './components/VideoModal';
import CinematicEffects from './components/CinematicEffects';
import MorPankhCursor from './components/MorPankhCursor';


const chaptersData = [
  {
    id: '01-prophecy',
    title: 'The Prophecy',
    act: 'I',
    image: '/the_prophecy.png',
    shortDesc: 'When Kansa was warned that Devaki\'s eighth child would slay him, he imprisoned them, setting the stage for the divine descent.',
    description: 'When darkness ruled the world and injustice prevailed, a divine voice prophesied that the eighth child of Devaki would slay the tyrant Kansa. Fearing this destiny, Kansa locked Devaki and Vasudeva in a high-security stone dungeon, vowing to destroy every child born to them.'
  },
  {
    id: '02-crossing-yamuna',
    title: 'Vasudeva Crossing the Yamuna',
    act: 'I',
    image: '/birth_of_krishna.png',
    shortDesc: 'Under a raging storm, Vasudeva carried newborn Krishna in a basket across the Yamuna, protected by Sheshnaag.',
    description: 'When the night of birth came, locks shattered, guards slept, and gates swung open. Under a tempestuous storm, Vasudeva carried newborn Krishna in a wicker basket across the flooded Yamuna River. To protect the divine child from the torrential rains, the great serpent Sheshnaag spread his multiple hoods like a giant canopy.'
  },
  {
    id: '03-little-kanha',
    title: 'Yashoda\'s Little Kanha',
    act: 'I',
    image: '/yashodas_little_kanha.png',
    shortDesc: 'Baby Krishna brought unbounded joy to Gokul, captivating Yashoda and all Gopis with his sweet innocence.',
    description: 'Arriving in the peaceful cowherd village of Gokul, Krishna became the heart of Nanda and Yashoda\'s household. Little Kanha filled Gokul with divine laughter, stealing hearts, crawling in the dust, and blessing the village with his sweet charms.'
  },
  {
    id: '04-makhan-chor',
    title: 'Makhan Chor',
    act: 'I',
    image: '/baby_krishna_butter.png',
    shortDesc: 'His mischiefs stole butter, but also every heart. The butter thief of Vrindavan was loved by all.',
    description: 'As he grew, Kanha formed a band of mischievous cowherd boys. They would sneak into Gopis\' homes, forming human pyramids to reach hanging pots of fresh butter (makhan), sharing the divine treat with monkeys and each other, leaving Gokul in absolute adoration.'
  },
  {
    id: '05-universe-mouth',
    title: 'The Universe in His Mouth',
    act: 'I',
    image: '/universe_in_his_mouth.jpg',
    shortDesc: 'When Yashoda opened Krishna\'s mouth to check for dirt, she saw the entire cosmos inside, leaving her in mystical awe.',
    description: 'Accused by his friends of eating dirt, little Krishna was confronted by Mother Yashoda. When she demanded he open his mouth, she did not find dirt; instead, she gazed into the infinite void, witnessing stars, galaxies, oceans, and the entire cosmos revolving inside him.'
  },
  {
    id: '06-damodar-leela',
    title: 'Damodar Leela',
    act: 'I',
    image: '/damodar_leela.jpg',
    shortDesc: 'Bound to a mortar by a rope of love, Yashoda\'s Kanha liberated two divine spirits from cursed trees.',
    description: 'Tired of his butter-stealing antics, Yashoda tied little Krishna to a heavy wooden mortar with a rope. Krishna dragged the mortar between two giant Arjuna trees, uprooting them and releasing two sons of Kubera who had been cursed to stand as trees.'
  },
  {
    id: '07-calves-test',
    title: 'Krishna and the Calves',
    act: 'I',
    image: '/krishna_and_calves.png',
    shortDesc: 'Lord Brahma hid the calves to test Krishna, but the Lord manifested Himself as every calf and cowboy, confusing the creator.',
    description: 'To test Krishna\'s divinity, Lord Brahma hid all the calves and cowherd boys of Vrindavan. Knowing Brahma\'s play, Krishna instantly expanded Himself to duplicate every single boy and calf, perfectly mimicking their personalities for a year until Brahma surrendered in devotion.'
  },
  {
    id: '08-peacock-chase',
    title: 'Peacock Chase',
    act: 'I',
    image: '/peacock_chase.png',
    shortDesc: 'In the meadows of Gokul, Krishna played with peacocks, dancing alongside them until they offered their feathers as crowns.',
    description: 'In the lush meadows of Vrindavan, Krishna would play his flute and dance with the wild peacocks. Captivated by his grace, the peacocks danced in ecstatic joy. As a token of gratitude, the king of peacocks offered his finest feather, which Krishna lovingly placed in his hair.'
  },
  {
    id: '09-radha-meeting',
    title: 'First Meeting of Radha',
    act: 'I',
    image: '/radha_meeting.jpg',
    shortDesc: 'By the banks of Yamuna, Radha and Krishna met, triggering a timeless cosmic reunion of souls.',
    description: 'Under the shade of the blossoming kadamba trees by the Yamuna River, Radha and Krishna met. This initial glance triggered the divine, eternal reunion of the supreme energy (Radha) and the supreme soul (Krishna), beginning a legendary saga of love.'
  },
  {
    id: '10-flower-crowns',
    title: 'Flower Crowns',
    act: 'I',
    image: '/flower_crowns.jpg',
    shortDesc: 'Adorning each other with wild forest flowers, their playful love blossomed under the canopy of Vrindavan.',
    description: 'In the groves of Vrindavan, Radha and Krishna would play with their friends, weaving beautiful crowns from wild forest flowers and placing them on each other\'s heads, signifying that true royalty lies in the simplicity of pure love.'
  },
  {
    id: '11-moonlight-yamuna',
    title: 'Moonlight Yamuna',
    act: 'I',
    image: '/moonlight_yamuna.jpg',
    shortDesc: 'Under the silvery moon, Radha and Krishna sat by the flowing river, sharing silent expressions of love.',
    description: 'On quiet, cool evenings, Radha and Krishna would sit on the stone steps of the Yamuna ghats under the glowing full moon, their hearts conversing in the language of silence while the ripples of the river reflected their divine presence.'
  },
  {
    id: '12-raas-leela',
    title: 'Raas Leela',
    act: 'I',
    image: '/raas_leela.jpg',
    shortDesc: 'Multiplying Himself, Krishna danced with every Gopi simultaneously in a circular dance of infinite bliss.',
    description: 'On a pleasant autumn night, Krishna activated his internal potency and played his flute, calling the Gopis to the forest. There, he expanded into identical forms to dance with each Gopi individually in a circle, creating a divine dance of spiritual ecstasy.'
  },
  {
    id: '13-kaliya-mardan',
    title: 'Kaliya Mardan',
    act: 'I',
    image: '/kaliya_mardan.jpg',
    shortDesc: 'He danced upon the hoods of the venomous serpent Kaliya, subduing the monster and purifying the sacred Yamuna.',
    description: 'To save Vrindavan from the deadly poison of the multi-hooded serpent Kaliya, Krishna dove into the boiling waters of the Yamuna. He leaped onto the serpent\'s giant heads and danced a rhythmic, cosmic dance, subduing the beast and restoring purity to the waters.'
  },
  {
    id: '14-govardhan-leela',
    title: 'Govardhan Leela',
    act: 'I',
    image: '/govardhan_leela.jpg',
    shortDesc: 'To protect Gokul from Indra\'s wrath, little Krishna lifted the massive Govardhan Hill on his little finger for seven days.',
    description: 'Angered by the villagers\' worship of the Govardhan Hill instead of him, Indra sent down torrential rain and storms. To shield Vrindavan, seven-year-old Krishna lifted the massive Govardhan Hill on the little finger of his left hand, holding it up like a giant umbrella for seven days.'
  },
  {
    id: '15-farewell-vrindavan',
    title: 'Farewell to Vrindavan',
    act: 'I',
    image: '/farewell_vrindavan.jpg',
    shortDesc: 'With a heavy heart, Krishna departed from the pastoral village of Vrindavan, leaving Yashoda and Radha behind.',
    description: 'As Akrura\'s chariot stood ready, Krishna bid farewell to Vrindavan. In an emotional parting, Mother Yashoda wept, and Radha shared a silent goodbye, knowing physical distance could never separate their eternally united souls.'
  },
  {
    id: '16-arrival-mathura',
    title: 'Arrival in Mathura',
    act: 'II',
    image: '/arrival_mathura.jpg',
    shortDesc: 'Entering the grand city of Mathura, Krishna was greeted by the citizens who saw in him their future protector.',
    description: 'Krishna and Balarama entered the heavily fortified city of Mathura. The citizens crowded the windows and streets, marveling at the grace and beauty of the cowherd brothers, sensing that the reign of the tyrant Kansa was drawing to its final hours.'
  },
  {
    id: '17-kansa-vadh',
    title: 'Kansa Vadh',
    act: 'II',
    image: '/kansa_vadh.jpg',
    shortDesc: 'Confronting the tyrant Kansa in his palace, Krishna defeated his evil uncle, restoring justice and order to the realm.',
    description: 'In Kansa\'s arena, Krishna defeated the king\'s champions and leaped onto the royal platform. Grabbing the tyrant Kansa by his hair, Krishna dragged him to the ground, ending his dark reign of terror and fulfilling the cosmic prophecy to restore dharma.'
  },
  {
    id: '18-meets-sudama',
    title: 'Krishna Meets Sudama',
    act: 'III',
    image: '/krishna_meets_sudama.jpg',
    shortDesc: 'Their first meeting at Guru Sandipani\'s ashram, where a profound and eternal friendship was forged.',
    description: 'At Guru Sandipani\'s ashram, Krishna met a humble and devoted brahmin boy named Sudama. Despite their different backgrounds, they quickly bonded over their studies and chores, forging an inseparable and pure friendship.'
  },
  {
    id: '19-studying-sandipani',
    title: 'Studying Under Guru Sandipani',
    act: 'III',
    image: '/guru_sandipani.jpg',
    shortDesc: 'Krishna and Balarama mastered all the Vedic sciences and arts under the guidance of their revered guru.',
    description: 'Displaying unparalleled intellect, Krishna and Balarama mastered all the scriptures, martial arts, and sciences in a remarkably short time under Guru Sandipani. To honor their teacher, they later restored his lost son as their Gurudakshina.'
  },
  {
    id: '20-establishes-dwarka',
    title: 'Krishna Establishes Dwarka',
    act: 'IV',
    image: '/establishes_dwarka.jpg',
    shortDesc: 'To protect the Yadavas, Krishna called upon Vishwakarma to construct an impregnable golden city in the sea.',
    description: 'Faced with repeated invasions, Krishna decided to move the Yadava clan to a secure location. He commanded the celestial architect Vishwakarma to build Dwarka, an awe-inspiring, impenetrable golden city arising from the ocean.'
  },
  {
    id: '21-sudama-journey',
    title: 'Sudama\'s Journey to Dwarka',
    act: 'IV',
    image: '/sudamas_journey.jpg',
    shortDesc: 'Living in poverty, Sudama traveled to the golden city to seek out his old friend, bringing only a handful of beaten rice.',
    description: 'Years later, living in extreme poverty, Sudama was urged by his wife to visit his childhood friend Krishna. Dressed in rags, he hesitantly traveled to Dwarka, carrying a modest gift of beaten rice wrapped in a torn cloth.'
  },
  {
    id: '22-runs-embrace',
    title: 'Krishna Runs to Embrace Sudama',
    act: 'IV',
    image: '/krishna_runs.jpg',
    shortDesc: 'Hearing of his friend\'s arrival, the Lord of Dwarka abandoned all royal protocols and sprinted to the palace gates.',
    description: 'When the guards announced Sudama\'s arrival, Krishna, the Lord of Dwarka, abandoned his throne and royal protocols. He ran barefoot to the palace gates, joyously embracing his bewildered and impoverished friend before the astounded citizens.'
  },
  {
    id: '23-washing-feet',
    title: 'Krishna Washing Sudama\'s Feet',
    act: 'IV',
    image: '/washing_feet.jpg',
    shortDesc: 'Seating his friend on the throne, the supreme Lord lovingly washed Sudama\'s feet with his own tears.',
    description: 'Inside the grand palace, Krishna seated Sudama on his own royal bed. Overwhelmed by affection, Krishna personally washed Sudama\'s tired and blistered feet, tears of pure love falling from the Lord\'s eyes.'
  },
  {
    id: '24-gift-beaten-rice',
    title: 'The Gift of Beaten Rice',
    act: 'IV',
    image: '/gift_of_beaten_rice.jpg',
    shortDesc: 'Relishing the humble offering of beaten rice, Krishna secretly bestowed boundless cosmic wealth upon his friend.',
    description: 'Noticing Sudama hiding his humble gift of beaten rice out of shame, Krishna eagerly snatched the pouch. With every handful he consumed with immense delight, he secretly bestowed boundless wealth and prosperity upon Sudama\'s distant home.'
  },
  {
    id: '25-leaves-flute',
    title: 'Krishna Leaves the Flute',
    act: 'EPILOGUE',
    image: '/leaves_flute.jpg',
    shortDesc: 'Symbolizing the end of his earthly leelas, the Lord sets aside his flute, leaving a legacy of eternal love.',
    description: 'Having completed his divine mission and re-established righteousness, Krishna set aside his beloved bansuri. His serene smile and eternal teachings remain forever etched in the hearts of devotees, guiding humanity towards selflessness and liberation.'
  }
];

const getActVerse = (act) => {
  switch (act) {
    case 'I':
      return {
        sanskrit: 'यदा यदा हि धर्मस्य ग्लानिर्भवति भारत । अभ्युत्थानमधर्मस्य तदात्मानं सृजाम्यहम् ॥',
        translation: 'Whenever righteousness declines and unrighteousness prevails, I manifest Myself on Earth.'
      };
    case 'II':
      return {
        sanskrit: 'परित्राणाय साधूनां विनाशाय च दुष्कृताम् । धर्मसंस्थापनार्थाय सम्भवामि युगे युगे ॥',
        translation: 'To protect the righteous, destroy the wicked, and re-establish dharma, I am born age after age.'
      };
    case 'III':
      return {
        sanskrit: 'विद्याविनयसम्पन्ने ब्राह्मणे गवि हस्तिनि । शुनि चैव श्वपाके च पण्डिताः समदर्शिनः ॥',
        translation: 'The wise look upon a learned scholar, a cow, an elephant, a dog, and an outcast with equal eye.'
      };
    case 'IV':
      return {
        sanskrit: 'पत्रं पुष्पं फलं तोयं यो मे भक्त्या प्रयच्छति । तदहं भक्त्युपहृतमश्नामि प्रयतात्मनः ॥',
        translation: 'Whoever offers Me with devotion a leaf, a flower, a fruit, or water, I accept it with love.'
      };
    case 'EPILOGUE':
      return {
        sanskrit: 'सर्वधर्मान्परित्यज्य मामेकं शरणं व्रज । अहं त्वां सर्वपापेभ्यो मोक्षयिष्यामि मा शुचः ॥',
        translation: 'Abandon all varieties of religion and just surrender unto Me. I shall deliver you from all sins; do not fear.'
      };
    default:
      return { sanskrit: '', translation: '' };
  }
};

const getChapterShloka = (chapterId) => {
  if (['01-prophecy', '02-crossing-yamuna'].includes(chapterId)) {
    return 'यदा यदा हि धर्मस्य ग्लानिर्भवति भारत ।';
  }
  if (['03-little-kanha', '05-universe-mouth', '06-damodar-leela', '07-calves-test'].includes(chapterId)) {
    return 'तेषां नित्याभियुक्तानां योगक्षेमं वहाम्यहम् ॥';
  }
  if (['08-peacock-chase', '09-radha-meeting', '10-flower-crowns', '11-moonlight-yamuna', '12-raas-leela', '15-farewell-vrindavan'].includes(chapterId)) {
    return 'ये यथा मां प्रपद्यन्ते तांस्तथैव भजाम्यहम् ।';
  }
  if (['13-kaliya-mardan', '14-govardhan-leela', '17-kansa-vadh'].includes(chapterId)) {
    return 'परित्राणाय साधूनां विनाशाय च दुष्कृताम् ॥';
  }
  if (['16-arrival-mathura', '18-meets-sudama', '19-studying-sandipani'].includes(chapterId)) {
    return 'न हि ज्ञानेन सदृशं पवित्रमिह विद्यते ।';
  }
  if (['20-establishes-dwarka', '21-sudama-journey', '22-runs-embrace', '23-washing-feet', '24-gift-beaten-rice'].includes(chapterId)) {
    return 'पत्रं पुष्पं फलं तोयं यो मे भक्त्या प्रयच्छति ॥';
  }
  if (chapterId === '25-leaves-flute') {
    return 'सर्वधर्मान्परित्यज्य मामेकं शरणं व्रज ।';
  }
  return 'जय श्री कृष्ण';
};

function App() {

  const [activeIndex, setActiveIndex] = useState(1); // Default to Chapter 02 (Vasudeva Crossing the Yamuna) to showcase Phase 1 image
  const [isAudioPlaying, setIsAudioPlaying] = useState(false); // Muted by default
  const [showEpilogue, setShowEpilogue] = useState(false);
  const [hasSeenEpilogue, setHasSeenEpilogue] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isVideoOpen, setIsVideoOpen] = useState(false);

  const [activeAct, setActiveAct] = useState(chaptersData[1]?.act || 'I');
  const [showActGate, setShowActGate] = useState(false);
  const [gateAct, setGateAct] = useState(null);


  const lenisRef = useRef(null);
  const isScrollingFromClick = useRef(false);
  const activeIndexRef = useRef(activeIndex);
  const activeDebounceTimeout = useRef(null);
  const isInitialMount = useRef(true);

  useEffect(() => {
    activeIndexRef.current = activeIndex;
  }, [activeIndex]);

  // Update activeAct when activeIndex crosses act boundaries
  useEffect(() => {
    const currentChapter = chaptersData[activeIndex];
    if (currentChapter) {
      const newAct = currentChapter.act;
      if (newAct !== activeAct) {
        setActiveAct(newAct);
      }
    }
  }, [activeIndex, activeAct]);

  // Manage transition overlay timer and scroll locking based strictly on activeAct changes
  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
      return;
    }

    setGateAct(activeAct);
    setShowActGate(true);
    
    if (lenisRef.current) {
      lenisRef.current.stop();
    }
    
    const timer = setTimeout(() => {
      setShowActGate(false);
      if (lenisRef.current) {
        lenisRef.current.start();
      }
    }, 4000);

    return () => clearTimeout(timer);
  }, [activeAct]);


  // Initialize and manage Lenis smooth scrolling and Intersection Observer responsive to desktop vs mobile container layouts
  useEffect(() => {
    let lenisInstance = null;
    let animationFrameId = null;
    let observer = null;
    let activeContainer = null;
    let scrollHandler = null;

    const initScrollAndObserver = () => {
      // Cleanup previous instances if active
      if (lenisInstance) {
        lenisInstance.destroy();
      }
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
      if (observer) {
        observer.disconnect();
      }
      if (activeContainer && scrollHandler) {
        activeContainer.removeEventListener('scroll', scrollHandler);
      }

      const isMobile = window.innerWidth <= 1200;
      const selector = isMobile ? '.app-container' : '.main-pane';
      const container = document.querySelector(selector);

      if (container) {
        lenisInstance = new Lenis({
          wrapper: container,
          content: container,
          duration: 1.2,
          easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
          orientation: 'vertical',
          gestureOrientation: 'vertical',
          smoothWheel: true,
          wheelMultiplier: 1.0,
          touchMultiplier: 1.5,
          infinite: false,
        });

        lenisRef.current = lenisInstance;

        const raf = (time) => {
          lenisInstance.raf(time);
          animationFrameId = requestAnimationFrame(raf);
        };
        animationFrameId = requestAnimationFrame(raf);

        // Setup Intersection Observer for scroll synchronization
        const sections = container.querySelectorAll('.chapter-section-wrapper');
        const intersectionRatios = {};

        observer = new IntersectionObserver((entries) => {
          entries.forEach(entry => {
            const index = entry.target.getAttribute('data-index');
            intersectionRatios[index] = entry.intersectionRatio;
          });

          if (isScrollingFromClick.current) return;

          // Find the entry with the highest intersection ratio
          let maxRatio = -1;
          let activeIdx = -1;

          Object.entries(intersectionRatios).forEach(([idxStr, ratio]) => {
            const idx = parseInt(idxStr, 10);
            if (ratio > maxRatio) {
              maxRatio = ratio;
              activeIdx = idx;
            }
          });

          const currentActiveIdx = activeIndexRef.current;
          const currentRatio = intersectionRatios[currentActiveIdx] || 0;

          // Activate when approximately 50-60% of the section enters the viewport
          // Hysteresis: only switch if the winner is significantly more visible to avoid rapid flickering loops
          if (activeIdx !== -1 && maxRatio >= 0.55 && activeIdx !== currentActiveIdx) {
            if (activeIdx === currentActiveIdx + 1 || activeIdx === currentActiveIdx - 1) {
              if (maxRatio < currentRatio + 0.08) {
                return;
              }
            }

            // Debounce the state update to ensure stability
            if (activeDebounceTimeout.current) {
              clearTimeout(activeDebounceTimeout.current);
            }
            activeDebounceTimeout.current = setTimeout(() => {
              setActiveIndex(activeIdx);
            }, 100);
          }
        }, {
          root: null, // use viewport for maximum compatibility on desktop and mobile
          threshold: [0, 0.25, 0.5, 0.55, 0.6, 0.8]
        });

        sections.forEach(section => observer.observe(section));

        // Parallax scroll coordination
        const handleScroll = () => {
          const scrollTop = container.scrollTop || 0;
          const scrollHeight = container.scrollHeight || 1;
          const clientHeight = container.clientHeight || 1;
          const maxScroll = scrollHeight - clientHeight;
          const globalProgress = maxScroll > 0 ? scrollTop / maxScroll : 0;

          document.documentElement.style.setProperty('--global-scroll-progress', globalProgress);

          const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
          if (isMobile || reduceMotion) {
            sections.forEach((sec) => {
              sec.style.setProperty('--scroll-progress', 0);
            });
            return;
          }

          const viewportHeight = window.innerHeight;
          sections.forEach((sec) => {
            const rect = sec.getBoundingClientRect();
            const sectionCenter = rect.top + rect.height / 2;
            const viewportCenter = viewportHeight / 2;
            const distance = sectionCenter - viewportCenter;
            const progress = distance / viewportHeight;
            sec.style.setProperty('--scroll-progress', progress);
          });
        };

        activeContainer = container;
        scrollHandler = handleScroll;
        container.addEventListener('scroll', handleScroll);
        handleScroll();
      }
    };

    // Delay initialization slightly to ensure all DOM elements are mounted and styled
    const timer = setTimeout(() => {
      initScrollAndObserver();
    }, 100);

    let wasMobile = window.innerWidth <= 1200;
    const handleResize = () => {
      const isMobileNow = window.innerWidth <= 1200;
      if (isMobileNow !== wasMobile) {
        wasMobile = isMobileNow;
        initScrollAndObserver();
      }
    };

    window.addEventListener('resize', handleResize);

    return () => {
      clearTimeout(timer);
      if (activeDebounceTimeout.current) {
        clearTimeout(activeDebounceTimeout.current);
      }
      if (lenisInstance) {
        lenisInstance.destroy();
      }
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
      if (observer) {
        observer.disconnect();
      }
      if (activeContainer && scrollHandler) {
        activeContainer.removeEventListener('scroll', scrollHandler);
      }
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // Recalculate scroll dimensions when layout changes (sidebar opens/closes)
  useEffect(() => {
    if (lenisRef.current) {
      lenisRef.current.resize();
      
      // Resize again after the CSS transition finishes (transition is 400ms)
      const timer = setTimeout(() => {
        lenisRef.current?.resize();
      }, 450);

      return () => clearTimeout(timer);
    }
  }, [isSidebarOpen]);

  useEffect(() => {
    // Show epilogue only the first time they reach chapter 25, or everytime if we don't want to restrict it.
    // Let's show it every time they select the last chapter, but allow dismissal.
    if (activeIndex === 24) {
      setShowEpilogue(true);
      setHasSeenEpilogue(true);
    } else {
      setShowEpilogue(false);
    }
  }, [activeIndex]);

  const handleChapterClick = (index) => {
    setActiveIndex(index);
    isScrollingFromClick.current = true;

    const targetSelector = `#chapter-section-${index}`;
    if (lenisRef.current) {
      lenisRef.current.scrollTo(targetSelector, {
        duration: 1.2,
        onComplete: () => {
          setTimeout(() => {
            isScrollingFromClick.current = false;
          }, 150);
        }
      });
    } else {
      const targetElement = document.querySelector(targetSelector);
      if (targetElement) {
        targetElement.scrollIntoView({ behavior: 'smooth' });
      }
      setTimeout(() => {
        isScrollingFromClick.current = false;
      }, 1200);
    }
  };

  const handleBeginJourney = () => {
    handleChapterClick(0);
  };

  const activeChapterNumber = activeIndex + 1;
  const paddedChapterNumber = String(activeChapterNumber).padStart(2, '0');
  const activeVideoSrc = `/videos/chapter${paddedChapterNumber}.mp4`;
  const activeVideoTitle = chaptersData[activeIndex] ? `Chapter ${paddedChapterNumber}: ${chaptersData[activeIndex].title}` : '';

  return (
    <div className={`app-container ${!isSidebarOpen ? 'sidebar-closed' : ''}`}>
      <MorPankhCursor />
      <CinematicEffects />

      {/* 1. Main Content Left Side (73% width) */}
      <main className="main-pane">
        <Navbar 
          isAudioPlaying={isAudioPlaying}
          onToggleAudio={() => setIsAudioPlaying(!isAudioPlaying)}
          onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
        />

        <HeroBanner onBeginJourney={handleBeginJourney} />

        <TimelineCarousel 
          chapters={chaptersData}
          activeIndex={activeIndex}
          onChangeActiveIndex={handleChapterClick}
        />

        <div className="chapters-scroll-list">
          {chaptersData.map((chapter, index) => (
            <section
              key={chapter.id}
              id={`chapter-section-${index}`}
              data-index={index}
              className={`chapter-section-wrapper ${index === activeIndex ? 'active' : ''}`}
            >
              <div className={`chapter-bg-shloka ${index === activeIndex ? 'active' : ''}`}>
                {getChapterShloka(chapter.id)}
              </div>
              <ChapterDetailsCard 
                activeChapter={chapter}
                activeIndex={index}
                onChangeActiveIndex={handleChapterClick}
                chapters={chaptersData}
                globalActiveIndex={activeIndex}
                onExplore={chapter.id !== '19-studying-sandipani' ? () => {
                  handleChapterClick(index);
                  setIsVideoOpen(true);
                } : null}
              />
            </section>
          ))}
        </div>
      </main>

      {/* 2. Scrollable Sidebar Right Side (27% width) */}
      <RightSidebar 
        chapters={chaptersData}
        activeIndex={activeIndex}
        onChangeActiveIndex={handleChapterClick}
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
      />

      {/* Floating Reopen Button */}
      <AnimatePresence>
        {!isSidebarOpen && (
          <motion.button
            className="floating-journey-btn"
            initial={{ x: 100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: 100, opacity: 0 }}
            transition={{ duration: 0.4, ease: 'easeOut' }}
            onClick={() => setIsSidebarOpen(true)}
          >
            <Menu size={18} />
            <span>Journey</span>
          </motion.button>
        )}
      </AnimatePresence>

      {/* Mobile Backdrop */}
      <div 
        className={`mobile-backdrop ${isSidebarOpen ? 'open' : ''}`} 
        onClick={() => setIsSidebarOpen(false)}
      />

      {/* Act Transition Gate Overlay */}
      <AnimatePresence>
        {showActGate && (
          <motion.div
            className="act-transition-gate"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.div
              className="gate-content"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -20, opacity: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
            >
              <span className="gate-act-title">ACT {gateAct}</span>
              <h2 className="gate-sanskrit">{getActVerse(gateAct).sanskrit}</h2>
              <p className="gate-translation">"{getActVerse(gateAct).translation}"</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 3. Invisible Audio Loop Controller */}
      <AudioPlayer 
        isPlaying={isAudioPlaying && !isVideoOpen}
        setIsPlaying={setIsAudioPlaying}
        isEpilogue={showEpilogue}
        activeIndex={activeIndex}
        chapters={chaptersData}
        showActGate={showActGate}
        gateAct={gateAct}
      />


      <EpilogueOverlay 
        isActive={showEpilogue} 
        onClose={() => setShowEpilogue(false)} 
      />

      <VideoModal
        isOpen={isVideoOpen}
        onClose={() => setIsVideoOpen(false)}
        videoSrc={activeVideoSrc}
        title={activeVideoTitle}
        activeChapterIndex={activeIndex}
        onNavigate={handleChapterClick}
        chapters={chaptersData}
      />

      <style dangerouslySetInnerHTML={{__html: `
        .chapters-scroll-list {
          display: flex;
          flex-direction: column;
          gap: 64px;
          margin-top: 48px;
          margin-bottom: 48px;
          width: 100%;
        }

        .chapter-section-wrapper {
          width: 100%;
          position: relative;
        }

        .chapter-bg-shloka {
          position: absolute;
          left: 50%;
          top: 50%;
          transform: translate(-50%, -50%) translateY(calc(var(--scroll-progress, 0) * -80px));
          font-family: var(--font-devanagari-calligraphy);
          font-size: 5.5rem;
          color: rgba(212, 175, 55, 0.02);
          text-shadow: 0 0 10px rgba(212, 175, 55, 0.04);
          white-space: nowrap;
          pointer-events: none;
          z-index: 1;
          letter-spacing: 4px;
          user-select: none;
          text-align: center;
          transition: transform 0.1s ease-out, color 0.8s ease, text-shadow 0.8s ease;
        }

        .chapter-bg-shloka.active {
          color: rgba(212, 175, 55, 0.05);
          text-shadow: 0 0 15px rgba(212, 175, 55, 0.12);
        }

        @media (max-width: 992px) {
          .chapter-bg-shloka {
            font-size: 3rem;
            letter-spacing: 2px;
          }
        }

        .chapter-section-wrapper .chapter-details-container {
          opacity: 0.15;
          transform: translateY(18px);
          transition: opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1), transform 0.8s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .chapter-section-wrapper.active .chapter-details-container {
          opacity: 1;
          transform: translateY(0);
        }

        /* Image gentle scale transition */
        .chapter-section-wrapper .details-scenic-image {
          transform: scale(0.98);
          transition: transform 0.8s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .chapter-section-wrapper.active .details-scenic-image {
          transform: scale(1.0);
        }

        /* Extra structural styling for mobile responsiveness */
        @media (max-width: 1200px) {
          .sidebar-pane {
            display: none; /* Default collapse on mobile */
          }
          .sidebar-pane.mobile-open {
            display: flex;
            position: fixed;
            top: 80px;
            right: 0;
            bottom: 0;
            width: 320px;
            height: calc(100vh - 80px);
            z-index: 100;
            box-shadow: -5px 0 25px rgba(0,0,0,0.5);
          }
        }

      `}} />
    </div>

  );
}

export default App;
