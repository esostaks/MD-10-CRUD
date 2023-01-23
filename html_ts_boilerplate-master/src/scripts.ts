import axios from 'axios';

const mainWrapper  = document.querySelector('.js-main-wrapper') as HTMLDivElement


type Card = {
  id: number,
  title: string,
  image: string,
  text: string
}


const getData = (data: Card[]) => {
  data.forEach(obj => {

    //CARD
    const card = document.createElement("div");
    card.classList.add("card");
    card.classList.add("js-card");
    mainWrapper.appendChild(card);
  
    //IMG-SECTION
    const imgSection = document.createElement("div");
    imgSection.classList.add("img__section");
    card.appendChild(imgSection);
  
    //TEXT-SECTION
    const txtSection = document.createElement("div");
    txtSection.classList.add("text__section");
    card.appendChild(txtSection);
  
    //BUTTON SECTION
    const btnSection = document.createElement("div");
    btnSection.classList.add("btn__section");
    card.appendChild(btnSection);
  
    //IMAGE
    const image = document.createElement("img") as HTMLImageElement
    image.classList.add("image");
    image.src = `${obj.image}`
    imgSection.appendChild(image);
    
    //TITLE
    const title = document.createElement("h4");
    title.classList.add("title");
    title.innerHTML = `${obj.title}`;
    txtSection.appendChild(title);
    
    //TEXT
    const text = document.createElement("p");
    text.classList.add("text");
    text.innerHTML = `${obj.text}`;
    txtSection.appendChild(text);
  
    //EDIT BUTTON
    const editBtn = document.createElement("button");
    editBtn.classList.add("edit__btn");
    editBtn.classList.add(`js-edit-${obj.id}`);
    editBtn.innerHTML = "EDIT";
    btnSection.appendChild(editBtn);
  
    //DELETE BUTTON
    const deleteBtn = document.createElement("button");
    deleteBtn.classList.add("delete__btn");
    deleteBtn.classList.add(`js-delete-${obj.id}`);
    deleteBtn.innerHTML = "DELETE";
    btnSection.appendChild(deleteBtn);

    const inputDiv = document.createElement("div");
    inputDiv.classList.add("input__div");
    card.appendChild(inputDiv);

    //DELETE CLICK
    deleteBtn.addEventListener('click', () => {
      axios.delete<Card[]>(`http://localhost:3004/cards/${obj.id}`).then(({ data }) => {      
      });
      mainWrapper.removeChild(card)
    });

    //EDIT CLICK
    editBtn.addEventListener('click', () => {
      const form = document.createElement("form");
      text.classList.add("update-form");
      card.appendChild(form);

      const cardLabel = document.createElement("label");
      cardLabel.classList.add("card__label");
      form.appendChild(cardLabel);

      const titleLabel = document.createElement("label");
      titleLabel.classList.add("title__label");
      titleLabel.innerHTML = "Title";
      cardLabel.appendChild(titleLabel);

      const textLabel = document.createElement("label");
      textLabel.classList.add("text__label");
      textLabel.innerHTML = "Text";
      cardLabel.appendChild(textLabel);

      const updatedTitle = document.createElement("input");
      updatedTitle.classList.add("updated__title");
      updatedTitle.value = `${obj.title}`;
      updatedTitle.setAttribute('required', '')
      titleLabel.appendChild(updatedTitle);

      const updatedText = document.createElement("textarea") as HTMLTextAreaElement
      updatedText.classList.add("updated__text");
      updatedText.value = `${obj.text}`;
      updatedText.rows = Number('10')
      updatedText.cols = Number('30')
      updatedText.setAttribute('required', '')
      textLabel.appendChild(updatedText);

      const updateBtn = document.createElement("button");
      updateBtn.classList.add(`update__btn`);
      updateBtn.classList.add(`js-update-btn-${obj.id}`);
      updateBtn.innerHTML = "UPDATE";
      form.appendChild(updateBtn);

      //HIDE DELETE AND EDIT WHEN EDIT PRESSED
      deleteBtn.classList.add("btn-hidden");
      editBtn.classList.add("btn-hidden");

      //UPDATE CLICK
      updateBtn.addEventListener('click', () => {
        axios.put<Card[]>(`http://localhost:3004/cards/${obj.id}`, {
          title: updatedTitle.value,
          text: updatedText.value,
          image: "https://picsum.photos/200"
        }).then(({ data }) => {
          deleteBtn.classList.remove("btn-hidden");
          editBtn.classList.remove("btn-hidden");
        });
      });

  


    });

  });

    

}

axios.get<Card[]>('http://localhost:3004/cards').then(({ data }) => {
  getData(data)

})


const addTitle = document.querySelector('.js-add-title') as HTMLInputElement
const addText = document.querySelector('.js-add-text') as HTMLInputElement
const addBtn = document.querySelector('.js-add-btn')



//ADD NEW
addBtn?.addEventListener('click', () => {
  axios.post<Card[]>('http://localhost:3004/cards', {
    title: addTitle.value,
    text: addText.value,
    image: "https://picsum.photos/200",
  }).then(({ data }) => {
    //  getData(data)
  });
});


