export class FileErrorExcaption extends Error {
  constructor(message) {
    super(message);
    this.name = "FileErrorExcation";
  }
}
