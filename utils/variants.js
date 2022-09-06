const variants = {
  columnHeader: {
    hidden: {
      opacity: 0,
    },
    visible: (i) => ({
      opacity: 1,
      transition: {
        delay: i * 0.07,
      },
    }),
    exit: {
      opacity: 0,
    },
  },
  taskItem: {
    hidden: {
      opacity: 0,
    },
    visible: (i) => ({
      opacity: 1,
      transition: {
        delay: i * 0.07,
      },
    }),
    exit: {
      opacity: 0,
    },
  },
  modal: {
    hidden: {
      scale: 0,
    },
    visible: {
      scale: 1,
      transition: {
        duration: 0.35,
      },
    },
    exit: {
      scale: 0,
    },
  },
  backdrop: {
    hidden: {
      opacity: 0,
    },
    visible: {
      opacity: 1,
    },
    exit: {
      opacity: 0,
    },
  },
}

export default variants
