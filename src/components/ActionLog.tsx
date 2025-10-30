import { motion, AnimatePresence } from 'framer-motion';
import { useMultiverseStore } from '../store/multiverseStore';

export const ActionLog = () => {
  const actionLog = useMultiverseStore(state => state.actionLog);

  return (
    <div className="absolute bottom-0 left-0 right-96 bg-gradient-to-t from-slate-900 via-slate-800/95 to-transparent p-6 border-t-4 border-purple-500">
      <h3 className="text-xl font-bold mb-3 text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-400" style={{ fontFamily: 'Bangers, cursive' }}>
        📖 MULTIVERSE LOG
      </h3>

      <div className="space-y-2 max-h-32 overflow-y-auto">
        <AnimatePresence mode="popLayout">
          {actionLog.slice(0, 3).map((entry) => (
            <motion.div
              key={entry.id}
              initial={{ opacity: 0, x: -50, scale: 0.8 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: 50, scale: 0.8 }}
              transition={{ duration: 0.5 }}
              className="relative"
            >
              <div
                className="bg-slate-800/80 backdrop-blur-sm px-4 py-3 rounded-lg border-l-4 shadow-lg"
                style={{ borderColor: entry.color }}
              >
                <p
                  className="font-medium text-sm"
                  style={{ color: entry.color }}
                >
                  {entry.message}
                </p>
              </div>

              <motion.div
                className="absolute -left-2 -top-2 w-4 h-4 rounded-full"
                style={{ backgroundColor: entry.color }}
                animate={{
                  scale: [1, 1.5, 1],
                  opacity: [1, 0.5, 1],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                }}
              />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
};
