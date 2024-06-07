export default function Style() {
  return (
    <section>
      <div className="center">
        <h1>Heading 1</h1>
        <h2>Heading 2</h2>
        <h3>Heading 3</h3>
        <h4>Heading 4</h4>
        <p>
          Paragraph Lorem ipsum dolor sit amet consectetur adipisicing elit.
          Tenetur ipsam rerum dicta similique officia obcaecati, enim expedita,
          asperiores nisi quas quod laudantium sunt tempora! Quasi placeat
          minima voluptatem inventore quos!
        </p>
        <ul>
          <li>test li</li>
          <li>test li</li>
          <li>test li</li>
        </ul>
        <a href="google.com">Google</a>
        <form action="get">
          <label htmlFor="test">Label</label>
          <input type="text" name="test" id="test" />
          <button type="submit">formbutton</button>
        </form>
        <img src="./src/assets/images/medium.webp" alt="test" />
        <button type="button">button</button>
      </div>
    </section>
  );
}