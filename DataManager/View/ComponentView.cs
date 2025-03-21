﻿using CroffleLogManager;
using DataManager.SQLiteDBMS;
using DataManager.SQLiteDBMS.Scheme;
using SQLite;

namespace DataManager.View;

public class Components
{
    public string? ContentsID { get; set; }
    public string? title { get; set; }
    public int color { get; set; }
    public bool done { get; set; }
    public DateTime content_date { get; set; }
    public DateTime start_time { get; set; }
    public DateTime end_time { get; set; }
}
public class ComponentView
{
    SQLiteConnection? _db;
    protected string DB_PATH = Path.Combine(AppDomain.CurrentDomain.BaseDirectory, "DB");

    IEnumerable<Components>? components;

    public Components? this[int index] { get => components?.ElementAt(index); }
    public IEnumerable<Components>? ListAll => components;

    public ComponentView()
    {
        SQLiteDB db = new();
        db.DB_Init();
        Init();
    }

    void Init()
    {
        if (_db is not null) return;

        _db = new(Path.Combine(DB_PATH, Constants.DB_NAME), Constants.FLAGS);
    }

    public void LoadComponent(DateTime from, DateTime to)
    {
        if (_db is null) return;
        try
        {
            var result = _db.Table<Memo>()
                    .Join(_db.Table<Event>(), (m) => m.ContentsID, (e) => e.ContentsID, (m, e) => new { m, e })
                    .Join(_db.Table<Contents>(), (me) => me.m.ContentsID, (c) => c.ContentsID, (me, c) => new { me, c })
                    .Select((mec) => new Components
                    {
                        ContentsID = mec.me.m.ContentsID,
                        title = mec.me.m.Title,
                        color = mec.c.Color,
                        done = mec.me.e.Done,
                        content_date = mec.c.ContentDate,
                        start_time = mec.me.e.StartTime,
                        end_time = mec.me.e.EndTime,
                    })
                    .Where(t => t.start_time >= from && t.end_time <= to)
                    .OrderByDescending(t => (t.end_time - t.start_time).Days + 1);
            components = result;
            Log.LogInfo($@"[ComponentView] LoadComponent - Success: {components.Count()} components loaded");
        }
        catch (SQLiteException e)
        {
            Log.LogError($@"[ComponentView] LoadComponent - Failed: {e.Message}");
            components = null;
        }
    }

    public void LoadComponent(DateTime from, DateTime to, bool done)
    {
        try
        {
            if (_db is null) return;
            var result = _db.Table<Memo>()
                    .Join(_db.Table<Event>(), (m) => m.ContentsID, (e) => e.ContentsID, (m, e) => new { m, e })
                    .Join(_db.Table<Contents>(), (me) => me.m.ContentsID, (c) => c.ContentsID, (me, c) => new { me, c })
                    .Select((mec) => new Components
                    {
                        ContentsID = mec.me.m.ContentsID,
                        title = mec.me.m.Title,
                        color = mec.c.Color,
                        done = mec.me.e.Done,
                        content_date = mec.c.ContentDate,
                        start_time = mec.me.e.StartTime,
                        end_time = mec.me.e.EndTime,
                    })
                    .Where(t => t.start_time >= from && t.end_time <= to)
                    .Where(t => t.done == done)
                    .OrderByDescending(t => (t.end_time - t.start_time).Days + 1);
            components = result;
        }
        catch (SQLiteException e)
        {
            Log.LogError($@"[ComponentView] LoadComponent - Failed: {e.Message}");
            components = null;
        }
    }

    public int? Count()
    {
        if (components is null) return null;
        return components.Count();
    }
}
