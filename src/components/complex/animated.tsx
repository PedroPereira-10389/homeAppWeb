import { motion, useAnimationControls } from 'framer-motion';
import { useEffect } from 'react';

const AnimatedComponent = ({ components, currentIndex }: { components: any, currentIndex: any }) => {
    return (
        <motion.div
            key={currentIndex}
            initial={{ opacity: 1, x: -100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
        >
            {components[currentIndex]}
        </motion.div>
    )
}
export default AnimatedComponent;