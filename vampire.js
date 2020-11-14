class Vampire {
  constructor(name, yearConverted) {
    this.name = name;
    this.yearConverted = yearConverted;
    this.offspring = [];
    this.creator = null;
  }

  /** Simple tree methods **/

  // Adds the vampire as an offspring of this vampire
  addOffspring(vampire) {
    this.offspring.push(vampire);
    vampire.creator = this;
  }

  // Returns the total number of vampires created by that vampire
  get numberOfOffspring() {
    return this.offspring.length;
  }

  // Returns the number of vampires away from the original vampire this vampire is
  get numberOfVampiresFromOriginal() {
    let numberOfVampires = 0;
    let currentVampire = this;

    while (currentVampire.creator) {
      currentVampire = currentVampire.creator;
      numberOfVampires++;
    } 

    return numberOfVampires;
  }

  // Returns true if this vampire is more senior than the other vampire. (Who is closer to the original vampire)
  isMoreSeniorThan(vampire) {
    return this.numberOfVampiresFromOriginal < vampire.numberOfVampiresFromOriginal;
  }

  /** Stretch **/

  // Returns the closest common ancestor of two vampires.
  // The closest common anscestor should be the more senior vampire if a direct ancestor is used.
  // For example:
  // * when comparing Ansel and Sarah, Ansel is the closest common anscestor.
  // * when comparing Ansel and Andrew, Ansel is the closest common anscestor.
  closestCommonAncestor(vampire) {
    let currentVampireToOriginal = this.numberOfVampiresFromOriginal;
    let otherVampireToOriginal = vampire.numberOfVampiresFromOriginal;
    let currentVampire = this;
    let otherVampire = vampire;

    if (!currentVampire.creator) {
      return currentVampire;
    }

    if (!otherVampire.creator) {
      return otherVampire;
    }

    if (currentVampireToOriginal === otherVampireToOriginal) {
      if(currentVampire === otherVampire) {
        return currentVampire;
      }
      let count = currentVampireToOriginal;
      while (count >= 0 ) {
        if (currentVampire.creator === otherVampire.creator) {
          return currentVampire.creator;
        }
        currentVampire = currentVampire.creator;
        otherVampire = otherVampire.creator;
        count--;
      }
    }
    
    if (currentVampireToOriginal < otherVampireToOriginal) {
      let count = otherVampireToOriginal;
      let currentVampire = this;
      let otherVampire = vampire;

      while (count >= 0) {
        if (currentVampire.numberOfVampiresFromOriginal < otherVampire.numberOfVampiresFromOriginal) {
          if(currentVampire === otherVampire.creator) {
            return currentVampire;
          }
          otherVampire = otherVampire.creator;
        } else if (currentVampire.numberOfVampiresFromOriginal === otherVampire.numberOfVampiresFromOriginal) {
          if(currentVampire === otherVampire){
            return currentVampire;
          }
          currentVampire = currentVampire.creator;
          otherVampire = otherVampire.creator;
        }
        count--;
      }
    }

    if (currentVampireToOriginal > otherVampireToOriginal) {
      let count = currentVampireToOriginal;
      let currentVampire = this;
      let otherVampire = vampire;

      while (count >= 0) {
        if (currentVampire.numberOfVampiresFromOriginal > otherVampire.numberOfVampiresFromOriginal) {
          if(currentVampire.creator === otherVampire) {
            return otherVampire;
          }
          currentVampire = currentVampire.creator;
        } else if (currentVampire.numberOfVampiresFromOriginal === otherVampire.numberOfVampiresFromOriginal) {
          if(currentVampire === otherVampire){
            return currentVampire;
          }
          currentVampire = currentVampire.creator;
          otherVampire = otherVampire.creator;
        }
        count--;
      }
    }

  }
}

module.exports = Vampire;


