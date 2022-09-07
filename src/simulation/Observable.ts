export class Observable {
  private readonly changeListeners: { callback: () => void }[] = [];

  public listenChanges(callback: () => void): () => void {
    const entry = { callback };
    this.changeListeners.push(entry);

    return () => {
      const index = this.changeListeners.indexOf(entry);

      if (index !== -1) {
        this.changeListeners.splice(index, 1);
      }
    };
  }

  protected emitChange() {
    for (const listener of this.changeListeners) {
      listener.callback();
    }
  }
}
