import { Link } from "react-router-dom";

export default function Home() {

    return (
        <div>
            <main className="max-w-7xl mx-auto p-2 md:flex md:gap-6">
                <section className="max-w-3xl mx-auto flex flex-col gap-6 mt-6">
                    <h1 className="font-medium text-4xl">Welcome to our Library</h1>
                    <p className="text-justify">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur dapibus venenatis ipsum, a malesuada tortor vestibulum eget. Vivamus erat libero, ullamcorper ac sollicitudin vitae, ultricies ac nunc. Sed eget nisi sed dolor efficitur fermentum ut nec mi. Aenean tristique non mi vitae blandit. Sed odio augue, feugiat at eros maximus, lobortis commodo leo. Pellentesque tristique sodales massa id tincidunt. Vivamus vitae aliquet lectus. Donec ac felis vitae ipsum auctor mattis.</p>
                    <Link to="/books">
                        <button className="rounded-2xl bg-gray-800 text-white shadow-md py-2 px-4 cursor-pointer transition duration-300 hover:bg-gray-700">See our Books</button>
                    </Link>
                </section>
                <section className="flex flex-col md:justify-end gap-6 mt-28 ">
                    <img src="/books.jpg" alt="Books" className="w-96 mx-auto shadow-2xl mb-10 transition duration-600 hover:scale-105" />
                    <h1 className="font-medium text-4xl">About our Library</h1>
                    <p className="text-justify">Nam pharetra, mi eleifend posuere varius, ex felis varius neque, et tempus neque ipsum id sapien. Sed vel pulvinar est. Nulla est velit, commodo in nunc a, pulvinar ornare odio. Sed tincidunt lacinia nunc. Aenean vulputate blandit est, ac efficitur sem. Cras vulputate tortor quis eleifend pulvinar. Nulla vitae diam non sapien dignissim commodo pretium eu diam. Fusce ut ornare metus. Nulla facilisis erat urna, porta bibendum elit pulvinar non. Maecenas vestibulum tempor purus. Quisque id odio sit amet tortor rutrum elementum nec sed mi. Donec elementum augue ipsum, non commodo purus commodo sit amet. Donec et odio iaculis, volutpat sapien sollicitudin, feugiat magna. Sed tempus condimentum blandit. Suspendisse potenti.</p>
                </section>
                
            </main >
        </div>
    )
}