import styles from './animatedWizardBackground.module.css'

export default function AnimatedWizardBackground() {
  return (
    <div aria-hidden className={styles.root}>
      <div className={styles.base} />
      <div className={styles.wash} />
      <div className={styles.washTwo} />
      <div className={`${styles.blob} ${styles.blobOne}`} />
      <div className={`${styles.blob} ${styles.blobTwo}`} />
      <div className={`${styles.blob} ${styles.blobThree}`} />
      <div className={`${styles.blob} ${styles.blobFour}`} />
      <div className={styles.centerFade} />
    </div>
  )
}
