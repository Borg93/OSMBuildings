
class Workers {

  constructor(path, num) {
    this.items = [];
    for (let i = 0; i < num; i++) {
      this.items[i] = { busy: false, worker: new Worker(path) };
    }
    this.status();
  }

  get(callback) {
    for (let i = 0; i < this.items.length; i++) {
      if (!this.items[i].busy) {
        this.items[i].busy = true;
        callback(this.items[i].worker);
        this.status();
        return;
      }
    }

    setTimeout(() => {
      this.get(callback);
    }, 100);
  }

  free(worker) {
    for (let i = 0; i < this.items.length; i++) {
      if (this.items[i].worker === worker) {
        this.items[i].busy = false;
        this.status();
        return;
      }
    }
  }

  status() {
    const res = [];
    for (let i = 0; i < this.items.length; i++) {
      res[i] = this.items[i].busy ? 'A' : '_';
    }
    console.log(res.join(''));
  }
}