import { X, Zap } from "lucide-react";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <header className="flex items-center sticky shadow-lg p-6">
        <div>
          <X />
        </div>
        <div className="grow">
          <div className="max-w-2xl mx-auto">
            <div className="w-full bg-gray-200 rounded-full h-2.5">
              <div className="bg-[#29cc57] h-2.5 rounded-full" style={{width: '45%'}}></div>
            </div>
          </div>
        </div>
        <div>
          <Zap className="text-[#ea580c]" />
        </div>
      </header>
      <main className="max-w-2xl mx-auto py-6">
        {children}
        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Obcaecati quidem corporis nostrum nemo error voluptate repellendus ratione, quasi doloremque illum? Corrupti expedita magni modi porro omnis id, fuga consequatur facere? Lorem ipsum dolor sit amet consectetur adipisicing elit. Veniam, fuga quae explicabo voluptas a excepturi, quibusdam dicta ratione dignissimos hic iure amet nulla soluta architecto minus natus. Cum, eaque officia!</p><br />
        <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Corporis reprehenderit nostrum culpa officiis odio ducimus nihil amet sit mollitia repudiandae. Repellendus, laborum! Error ab quae repellat iusto amet qui distinctio. Lorem ipsum dolor sit amet consectetur adipisicing elit. Veniam, fuga quae explicabo voluptas a excepturi, quibusdam dicta ratione dignissimos hic iure amet nulla soluta architecto minus natus. Cum, eaque officia!</p><br />
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolores temporibus qui beatae repellat quo quis libero quisquam dicta. Rem eum nam et praesentium nemo numquam eos porro blanditiis veritatis qui.</p><br />
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Beatae tempora officia repudiandae perspiciatis dolores natus ab harum aliquid nemo reprehenderit deserunt at maxime inventore ipsa quo, quis iusto culpa delectus.</p><br />
        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Obcaecati quidem corporis nostrum nemo error voluptate repellendus ratione, quasi doloremque illum? Corrupti expedita magni modi porro omnis id, fuga consequatur facere? Lorem ipsum dolor sit amet consectetur adipisicing elit. Veniam, fuga quae explicabo voluptas a excepturi, quibusdam dicta ratione dignissimos hic iure amet nulla soluta architecto minus natus. Cum, eaque officia!</p><br />
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsa saepe quod veritatis obcaecati atque, tempora iusto? Ipsum tempore nesciunt, quisquam rem iure itaque, velit harum quos commodi exercitationem, atque iusto! Lorem ipsum dolor sit amet consectetur adipisicing elit. Distinctio molestiae, ea consectetur quisquam vel architecto ex iure tempora itaque quasi nihil accusamus saepe, repellendus delectus iusto obcaecati dolor harum. Harum.</p><br />
        <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Corporis reprehenderit nostrum culpa officiis odio ducimus nihil amet sit mollitia repudiandae. Repellendus, laborum! Error ab quae repellat iusto amet qui distinctio. Lorem ipsum dolor sit amet consectetur adipisicing elit. Veniam, fuga quae explicabo voluptas a excepturi, quibusdam dicta ratione dignissimos hic iure amet nulla soluta architecto minus natus. Cum, eaque officia!</p><br />
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolores temporibus qui beatae repellat quo quis libero quisquam dicta. Rem eum nam et praesentium nemo numquam eos porro blanditiis veritatis qui.</p>
      </main>
    </div>
  );
}
