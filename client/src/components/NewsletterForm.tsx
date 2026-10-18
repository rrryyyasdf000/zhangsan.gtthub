import { FormEvent, useState } from "react";
import { ArrowUpRight, Check, LoaderCircle } from "lucide-react";
import { trpc } from "@/lib/trpc";

type NewsletterFormProps = {
  source: string;
  compact?: boolean;
};

export default function NewsletterForm({ source, compact = false }: NewsletterFormProps) {
  const staticSite = import.meta.env.VITE_STATIC_SITE === "true";
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const subscribe = trpc.newsletter.subscribe.useMutation({
    onSuccess: data => {
      setMessage(data.status === "exists" ? "这个邮箱已订阅，我们会继续把新洞察送达给你。" : "订阅成功。下一期洞察将发送到你的邮箱。");
      if (data.status === "created") setEmail("");
    },
    onError: error => setMessage(error.message || "暂时无法订阅，请稍后再试。"),
  });

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (staticSite) return;
    setMessage("");
    subscribe.mutate({ email, source });
  }

  return (
    <form className={`newsletter-form ${compact ? "newsletter-form--compact" : ""}`} onSubmit={submit} noValidate>
      <label className="sr-only" htmlFor={`email-${source}`}>工作邮箱</label>
      <input
        id={`email-${source}`}
        type="email"
        autoComplete="email"
        placeholder="工作邮箱"
        value={email}
        onChange={event => setEmail(event.target.value)}
        required
        disabled={staticSite}
        aria-describedby={`email-note-${source}`}
      />
      <button type="submit" disabled={staticSite || subscribe.isPending}>
        {staticSite ? <span>暂不可用</span> : subscribe.isPending ? <LoaderCircle size={17} className="spin" /> : <><span>订阅洞察</span><ArrowUpRight size={17} /></>}
      </button>
      <p id={`email-note-${source}`} className="newsletter-status" aria-live="polite">
        {staticSite ? "此 GitHub Pages 静态版暂不支持邮箱订阅。" : message ? <><Check size={14} />{message}</> : "每月两次，关于内容、搜索与增长的可执行判断。"}
      </p>
    </form>
  );
}
